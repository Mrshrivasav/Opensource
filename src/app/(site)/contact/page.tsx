import type { Metadata } from "next"
import Image from "next/image"
import { Mail } from "lucide-react"
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"
import { BlurFade } from "@/components/site/blur-fade"
import { ContactPanel } from "@/components/site/contact-panel"
import { Container } from "@/components/site/container"
import { HoverLift } from "@/components/site/hover-lift"
import { profile, socials } from "@/data/portfolio"

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a call or send a message to Diggaj Raj.",
}

const channels = [
  { label: "Email", value: profile.email, href: socials.email, icon: Mail },
  { label: "LinkedIn", value: "Diggaj Raj", href: socials.linkedin, icon: FaLinkedinIn },
  { label: "X", value: "@Mrshrivasav", href: socials.x, icon: FaXTwitter },
  { label: "GitHub", value: "Mrshrivasav", href: socials.github, icon: FaGithub },
]

export default function ContactPage() {
  return (
    <section className="pt-24 pb-12 md:pt-28">
      <Container>
        <BlurFade className="flex items-end justify-between gap-6">
          <div>
            <p className="font-plex text-xs tracking-wider text-neutral-500">Connect / Follow / Chat</p>
            <h1 className="mt-3 font-plex text-3xl leading-[1.1] font-normal tracking-tight text-foreground sm:text-[2.5rem]">
              Book a call
              <br />
              <span className="text-neutral-400 dark:text-neutral-500">with me</span>
            </h1>
          </div>
          <HoverLift lift={3} scale={1.03} rotate={-3} className="shrink-0">
            <span className="relative block size-20 overflow-hidden rounded-full after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[1.5px] after:border-neutral-300/40 sm:size-28 dark:after:border-neutral-500/50">
              <Image src={profile.avatar} alt={profile.name} fill sizes="112px" className="object-cover" priority />
            </span>
          </HoverLift>
        </BlurFade>

        <BlurFade delay={0.1}>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
            Got an idea, a role or a product that needs shipping? Pick a slot for a quick intro call, or drop me a message and
            I&apos;ll get back within a day.
          </p>
        </BlurFade>

        <BlurFade delay={0.2} className="mt-8">
          <ContactPanel />
        </BlurFade>

        <BlurFade delay={0.3} className="mt-10">
          <p className="mb-3 font-plex text-xs tracking-wider text-neutral-500">Elsewhere</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {channels.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-[14px] border border-dashed border-black/15 px-3.5 py-3 transition-colors hover:border-black/30 dark:border-white/15 dark:hover:border-white/30"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-black/5 text-neutral-600 transition-transform duration-300 group-hover:-rotate-6 dark:bg-white/10 dark:text-neutral-300">
                    <Icon className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-neutral-500">{label}</span>
                    <span className="block truncate text-sm text-foreground">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </BlurFade>
      </Container>
    </section>
  )
}
