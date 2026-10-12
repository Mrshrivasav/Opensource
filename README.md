# Diggaj Raj — Portfolio

Personal portfolio built with Next.js (App Router), Tailwind CSS v4, Base UI and Motion.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup checklist

Two features need a one-time setup before they work: the AI chat and the booking calendar.

### 1. AI chat (bottom-right "Chat with AI")

The chat runs on free models through [OpenRouter](https://openrouter.ai). By default it uses NVIDIA Nemotron and falls back to other free models when that one is busy.

1. Sign in at [openrouter.ai/keys](https://openrouter.ai/keys) and create a key (`sk-or-v1-...`).
2. Add it to `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   ```
3. Restart `npm run dev`. Env files are only read on startup.
4. **Production:** add the same variable in Vercel → Project → Settings → Environment Variables, then redeploy.

Optional variables:

| Variable | Purpose |
|---|---|
| `OPENROUTER_MODEL` | Primary model. Default: `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` |
| `NEXT_PUBLIC_SITE_URL` | Live URL, sent to OpenRouter as the referer (e.g. `https://www.iamdiggaj.online`) |

Customising the assistant:

- **What it knows:** `src/data/portfolio.ts`, the same data the pages render. Edit a project, job or certificate there and the chat picks it up.
- **Tone and rules:** `src/lib/assistant-prompt.ts`.
- **Greeting and suggestion buttons:** `greeting` / `suggestions` in `src/components/site/chat-widget.tsx`.
- **Fallback models and rate limit** (30 messages per 10 minutes per visitor): `src/app/api/chat/route.ts`.

Troubleshooting:
- *"The assistant isn't configured yet":* the key isn't loaded. Check the variable name and restart the server.
- *"The assistant is busy":* the free models are rate-limited or the key is invalid. Wait a minute or set a different `OPENROUTER_MODEL`.

### 2. Booking calendar (`/contact`)

Every "Book a Call" button opens `/contact`, which embeds a [cal.com](https://cal.com) calendar. Visitors pick a date and time, enter their name and email, and the booking lands in your calendar. If `calLink` is empty, the page shows an "Email to book" card instead.

> **⚠️ To do: update the link.** `calLink` is currently a placeholder, `bikashsahu/30min` ([cal.com/bikashsahu/30min](https://cal.com/bikashsahu/30min)), so bookings go to that account. Replace it with your own cal.com link (steps below) before going live.

1. Sign up at [cal.com](https://cal.com/signup) (the free plan is enough). Your username becomes your link, e.g. `cal.com/diggaj`.
2. In the cal.com dashboard:
   - **Availability:** set working days and hours, timezone `Asia/Kolkata`. Visitors see slots in their own timezone.
   - **Calendars:** connect Google Calendar so bookings are added to it and busy times are blocked.
   - **Conferencing:** connect Google Meet or Zoom so each booking gets a meeting link.
   - **Event Types:** create one, e.g. "30 min intro call" with slug `30min`. Buffers, minimum notice and extra questions are set here.
3. Set the link in `src/data/portfolio.ts`, using the part after `cal.com/`:
   ```ts
   calLink: "diggaj/30min", // one event; use "diggaj" to let visitors choose between event types
   ```

No API keys are needed. cal.com sends confirmations and reminders and handles rescheduling. The embed follows the site's light/dark theme.

## Editing content

Almost everything lives in **`src/data/portfolio.ts`**: profile, socials, projects, blog posts, experience, certificates and the bucket list.

| What | Where |
|---|---|
| Project card images (16:9) | `public/projects/thumbs/` |
| Project demo videos (in the details modal) | `public/projects/` |
| Institution logos (hero chips, experience) | `public/logos/` |
| Resume | `public/resume.pdf` |
| Chat avatar | `public/profile/assistant.jpeg` |

## Pages

`/` home · `/blogs` · `/contact` · `/certificates` · `/bucketlist` · `/design-system` (component playground).
Certificates and Bucket list are in the navbar's **More** menu.

## Deploy

Deploy on [Vercel](https://vercel.com/new). Remember to add `OPENROUTER_API_KEY` (and optionally the other variables) in the project's environment variables.
