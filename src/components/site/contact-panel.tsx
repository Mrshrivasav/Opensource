"use client"

import { useState } from "react"
import Cal from "@calcom/embed-react"
import { motion } from "motion/react"
import { CalendarDays, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsDark } from "@/components/design-system/theme-toggle"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "call", label: "Book a call", icon: CalendarDays },
  { id: "message", label: "Send a message", icon: MessageSquare },
] as const

type Tab = (typeof tabs)[number]["id"]

const field =
  "w-full rounded-[10px] bg-black/[0.04] px-3.5 py-2.5 text-sm text-foreground shadow-border outline-none transition-shadow placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-ring/50 dark:bg-white/[0.05]"
const label = "mb-1.5 block font-plex text-[11px] tracking-wider text-neutral-500"

function Booking() {
  const dark = useIsDark()

  if (!profile.calLink) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
        <span className="grid size-11 place-items-center rounded-full bg-black/5 dark:bg-white/10">
          <CalendarDays className="size-5 text-neutral-500" />
        </span>
        <p className="max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          The calendar isn&apos;t open yet. Email me with a couple of times that suit you and I&apos;ll send an invite.
        </p>
        <Button variant="solid" size="pill" className="h-9" render={<a href={`mailto:${profile.email}?subject=Let%27s%20book%20a%20call`} />} nativeButton={false}>
          <Mail /> Email to book
        </Button>
      </div>
    )
  }

  return (
    <Cal
      // Remount on theme change so the embed picks up the new theme.
      key={dark ? "dark" : "light"}
      calLink={profile.calLink}
      config={{ layout: "month_view", theme: dark ? "dark" : "light" }}
      className="min-h-[34rem] w-full"
    />
  )
}

/** No backend: the form opens the visitor's mail app with everything filled in. */
function MessageForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const name = String(data.get("name") ?? "")
        const body = `${data.get("message")}\n\n${name}${data.get("email") ? ` (${data.get("email")})` : ""}`
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${name || "your site"}`)}&body=${encodeURIComponent(body)}`
      }}
      className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5"
    >
      <div>
        <label htmlFor="contact-name" className={label}>Name</label>
        <input id="contact-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={label}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Have a question or want to work together? Drop me a message."
          className={cn(field, "resize-y")}
        />
      </div>
      <div className="flex items-center justify-between gap-3 sm:col-span-2">
        <p className="text-xs text-neutral-500">Opens your email app.</p>
        <Button type="submit" variant="solid" size="pill" className="h-9">
          Send message
        </Button>
      </div>
    </form>
  )
}

export function ContactPanel() {
  const [tab, setTab] = useState<Tab>("call")

  return (
    <div>
      <div role="tablist" aria-label="Contact options" className="mb-3 inline-flex rounded-full bg-white/85 p-1 shadow-nav dark:bg-neutral-800/85">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              "relative flex h-8 items-center gap-1.5 rounded-full px-3.5 text-sm transition-colors",
              tab === id ? "text-black dark:text-white" : "text-neutral-600 hover:text-black dark:text-white/65 dark:hover:text-white"
            )}
          >
            {tab === id && (
              <motion.span
                layoutId="contact-tab"
                className="absolute inset-0 -z-0 rounded-full bg-black/6 dark:bg-white/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="relative size-3.5" />
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>

      {/* Nested radii: inner 12px = outer 18px − 6px padding. */}
      <div className="rounded-[18px] border border-dashed border-black/15 bg-surface/60 p-1.5 dark:border-white/15 dark:bg-white/[0.02]">
        <div role="tabpanel" className="overflow-hidden rounded-[12px] bg-background shadow-border">
          {tab === "call" ? <Booking /> : <MessageForm />}
        </div>
      </div>
    </div>
  )
}
