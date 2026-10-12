import { assistantPrompt } from "@/lib/assistant-prompt"

// Free OpenRouter models (same primary as the old site). OpenRouter tries them in order
// when one is rate-limited or down; "openrouter/free" routes to any available free model.
const MODELS = [
  process.env.OPENROUTER_MODEL ?? "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "openrouter/free",
]

const MAX_MESSAGES = 12
const MAX_CHARS = 2000

// Best-effort per-IP limit. It lives in memory, so it resets on deploy and isn't shared across instances.
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 30
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_REQUESTS
}

type ChatMessage = { role: "user" | "assistant"; content: string }

function parseMessages(body: unknown): ChatMessage[] | null {
  const messages = (body as { messages?: unknown })?.messages
  if (!Array.isArray(messages) || messages.length === 0) return null
  const clean = messages.slice(-MAX_MESSAGES).filter(
    (m): m is ChatMessage =>
      (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim() !== ""
  )
  if (clean.length === 0 || clean.at(-1)!.role !== "user") return null
  return clean.map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
}

/** Streams the reply back as plain text chunks. */
export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return Response.json({ error: "The assistant isn't configured yet." }, { status: 503 })

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"
  if (rateLimited(ip)) return Response.json({ error: "Too many messages. Try again in a few minutes." }, { status: 429 })

  const messages = parseMessages(await request.json().catch(() => null))
  if (!messages) return Response.json({ error: "Invalid request." }, { status: 400 })

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      "X-Title": "Diggaj Raj portfolio",
    },
    body: JSON.stringify({
      models: MODELS,
      stream: true,
      max_tokens: 600,
      temperature: 0.6,
      // Reasoning models think first; keep the thoughts out of the reply.
      reasoning: { exclude: true },
      messages: [{ role: "system", content: assistantPrompt }, ...messages],
    }),
    signal: request.signal,
  })

  if (!upstream.ok || !upstream.body) {
    const status = upstream.status === 429 ? 429 : 502
    return Response.json({ error: "The assistant is busy right now. Please try again shortly." }, { status })
  }

  // Unwrap OpenRouter's server-sent events into the content deltas only.
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ""
  const text = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue // also skips ": OPENROUTER PROCESSING" keep-alives
          const data = line.slice(6).trim()
          if (data === "[DONE]") continue
          try {
            const delta: unknown = JSON.parse(data).choices?.[0]?.delta?.content
            if (typeof delta === "string" && delta) controller.enqueue(encoder.encode(delta))
          } catch {}
        }
      },
    })
  )

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  })
}
