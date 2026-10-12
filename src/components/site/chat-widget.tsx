"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUp, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = { role: "user" | "assistant"; content: string; error?: boolean }

const avatar = "/profile/assistant.jpeg"
const greeting: Message = {
  role: "assistant",
  content: "Hi, I'm Diggaj's digital twin. Ask me about my experience, projects or skills, or how to book a call.",
}
const suggestions = ["Who is Diggaj?", "What have you built?", "Why should I hire you?", "How do I book a call?"]

// Site paths (/contact, /#work, /resume.pdf) and full URLs in replies become links.
const linkPattern = /(https?:\/\/[^\s)]+|(?<=^|[\s(])\/(?:#?[a-z][\w-]*(?:\/[\w-]+)*(?:\.pdf)?)?)/g

function Linkified({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  return text.split(linkPattern).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    const trail = part.match(/[.,!?:;]+$/)?.[0] ?? ""
    const href = part.slice(0, part.length - trail.length)
    const className = "underline decoration-dotted underline-offset-2 hover:decoration-solid"
    return (
      <Fragment key={i}>
        {href.startsWith("/") && !href.endsWith(".pdf") ? (
          <Link href={href} onClick={onNavigate} className={className}>
            {href}
          </Link>
        ) : (
          <a href={href} target="_blank" rel="noreferrer" className={className}>
            {href}
          </a>
        )}
        {trail}
      </Fragment>
    )
  })
}

function Avatar({ className }: { className?: string }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/15", className)}>
      <Image src={avatar} alt="" fill sizes="40px" className="object-cover object-[50%_38%] grayscale" />
    </span>
  )
}

/** Floating "Chat with AI" launcher (bottom right) and its chat panel, streamed from /api/chat. */
export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [input, setInput] = useState("")
  const [pending, setPending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, pending])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => () => abortRef.current?.abort(), [])

  async function send(text: string) {
    const content = text.trim()
    if (!content || pending) return
    setInput("")
    const history = [...messages, { role: "user" as const, content }]
    setMessages(history)
    setPending(true)

    const controller = new AbortController()
    abortRef.current = controller
    let reply = ""
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI only; failed replies are dropped from the context.
        body: JSON.stringify({ messages: history.slice(1).filter((m) => !m.error).map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) {
        const { error } = await res.json().catch(() => ({ error: null }))
        throw new Error(error ?? "Something went wrong. Please try again.")
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      setMessages((m) => [...m, { role: "assistant", content: "" }])
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        reply += decoder.decode(value, { stream: true })
        const content = reply
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content }])
      }
      if (!reply.trim()) throw new Error("I couldn't come up with a reply. Try asking another way.")
    } catch (err) {
      if (controller.signal.aborted) return
      const message = err instanceof Error ? err.message : "Something went wrong."
      setMessages((m) => [...(reply === "" && m.at(-1)?.content === "" ? m.slice(0, -1) : m), { role: "assistant", content: message, error: true }])
    } finally {
      setPending(false)
    }
  }

  const waiting = pending && messages.at(-1)?.role === "user"

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            key="chat"
            role="dialog"
            aria-label="Chat with Diggaj's AI assistant"
            initial={{ opacity: 0, y: 12, scale: 0.96, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8, scale: 0.97, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed right-3 bottom-[4.75rem] z-50 flex h-[min(32rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[20px] bg-white/90 shadow-nav backdrop-blur-xl backdrop-saturate-150 sm:right-5 dark:bg-neutral-900/90"
          >
            <header className="flex items-center gap-3 border-b border-black/6 px-4 py-3 dark:border-white/8">
              <Avatar className="size-9" />
              <div className="min-w-0 flex-1">
                <p className="font-plex text-sm text-foreground">Diggaj&apos;s assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> AI · answers as Diggaj
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
              >
                <X className="size-4" />
              </button>
            </header>

            <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <p key={i} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-black px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap text-white dark:bg-white dark:text-black">
                    {m.content}
                  </p>
                ) : (
                  <p
                    key={i}
                    className={cn(
                      "w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-black/[0.04] px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap shadow-border dark:bg-white/[0.06]",
                      m.error ? "text-rose-600 dark:text-rose-400" : "text-neutral-700 dark:text-neutral-200"
                    )}
                  >
                    <Linkified text={m.content} onNavigate={() => setOpen(false)} />
                  </p>
                )
              )}
              {waiting && (
                <p aria-label="Assistant is typing" className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-black/[0.04] px-3.5 py-3 shadow-border dark:bg-white/[0.06]">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.span
                      key={d}
                      className="size-1.5 rounded-full bg-neutral-400"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d }}
                    />
                  ))}
                </p>
              )}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-dashed border-black/15 px-3 py-1 text-xs text-neutral-600 transition-colors hover:border-black/30 hover:text-foreground dark:border-white/15 dark:text-neutral-400 dark:hover:border-white/30 dark:hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-black/6 p-2.5 dark:border-white/8"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                maxLength={2000}
                aria-label="Message"
                className="h-10 min-w-0 flex-1 rounded-full bg-black/[0.04] px-4 text-sm text-foreground outline-none placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-ring/50 dark:bg-white/[0.06]"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-white transition-[opacity,transform] active:scale-95 disabled:opacity-30 dark:bg-white dark:text-black"
              >
                <ArrowUp className="size-4" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with AI"}
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 1.1 }}
        className="fixed right-3 bottom-5 z-50 flex items-center gap-2.5 rounded-full bg-white/85 p-1 text-sm text-neutral-700 shadow-nav backdrop-blur-md backdrop-saturate-150 sm:right-5 sm:pr-4 dark:bg-neutral-800/85 dark:text-white/80"
      >
        <span className="relative block">
          <Avatar className="size-8" />
          <span className="absolute right-0 bottom-0 size-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-800" />
        </span>
        <span className="hidden font-plex text-[13px] text-shimmer sm:inline">{open ? "Close chat" : "Chat with AI"}</span>
      </motion.button>
    </>
  )
}
