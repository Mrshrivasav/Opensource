import Image from "next/image"
import { ArrowUpRight, Award, GraduationCap, Mail, MapPin, Rocket } from "lucide-react"
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { HoverLift } from "@/components/site/hover-lift"
import { profile, socials } from "@/data/portfolio"

const socialLinks = [
  { label: "GitHub", href: socials.github, icon: FaGithub },
  { label: "X", href: socials.x, icon: FaXTwitter },
  { label: "LinkedIn", href: socials.linkedin, icon: FaLinkedinIn },
  { label: "Email", href: socials.email, icon: Mail },
]

function Chip({ icon: Icon, tone, children }: { icon: React.ElementType; tone: string; children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex translate-y-[-1px] items-center gap-1 rounded-md bg-primary/5 px-1.5 py-px align-middle text-[0.85em] font-medium text-foreground shadow-border transition-transform duration-300 ease-out-quint hover:-translate-y-0.5 hover:-rotate-1">
      <span className={`grid size-4 place-items-center rounded-[4px] ${tone}`}>
        <Icon className="size-2.5" />
      </span>
      {children}
    </span>
  )
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group/link inline-flex items-center gap-0.5 border-b border-dashed border-foreground/40 font-medium text-foreground transition-colors hover:border-foreground"
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  )
}

export function Hero() {
  return (
    <section id="about" className="scroll-mt-24 pt-24 pb-10 md:pt-28">
      <Container>
        <div className="flex items-start justify-between gap-6">
          <BlurFade>
            <HoverLift lift={3} scale={1.03} rotate={-2} className="flex w-fit">
              {/* Thin grey inner border (overlay above the photo) instead of an outer shadow. */}
              <div className="relative size-18 overflow-hidden rounded-[14px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[1.5px] after:border-neutral-300/40 sm:size-20 dark:after:border-neutral-500/50">
                <div className="relative size-full">
                  <Image src={profile.avatar} alt={profile.name} fill sizes="80px" className="object-cover" priority />
                </div>
              </div>
            </HoverLift>
            <h1 className="mt-4 pb-1 font-instrument-serif text-3xl leading-none tracking-tight text-foreground sm:text-4xl">
              {profile.name}
            </h1>
          </BlurFade>

          <BlurFade delay={0.1} className="flex flex-wrap justify-end gap-1.5 pt-1">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <HoverLift key={label} rotate={-6}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="elevated"
                        size="icon-round"
                        className="size-8"
                        aria-label={label}
                        render={<a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" />}
                        nativeButton={false}
                      />
                    }
                  >
                    <Icon className="size-3.5" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{label}</TooltipContent>
                </Tooltip>
              </HoverLift>
            ))}
          </BlurFade>
        </div>

        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
          <BlurFade delay={0.2}>
            <p>
              I&apos;m a <strong className="font-medium text-foreground">Software Developer</strong> and BCA student at{" "}
              <Chip icon={GraduationCap} tone="bg-blue-600 text-white">Galgotias University</Chip>, building thoughtful,
              reliable and scalable digital experiences across web, data and AI.
            </p>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p>
              I specialise in <strong className="font-medium text-foreground">AI Engineering</strong> and{" "}
              <strong className="font-medium text-foreground">Full Stack Development</strong>: local LLMs, agentic AI and MERN apps
              that people can trust.
            </p>
          </BlurFade>
          <BlurFade delay={0.4}>
            <p>
              Previously, I worked with <Chip icon={Rocket} tone="bg-orange-500 text-white">IIT Bombay E-Cell</Chip> helping
              early-stage startups ship, and completed a micro-credit programme at{" "}
              <Chip icon={Award} tone="bg-rose-500 text-white">IIT Guwahati</Chip>.
            </p>
          </BlurFade>
          <BlurFade delay={0.5}>
            <p>
              Checkout my <InlineLink href="#work">Proof of Work</InlineLink> or grab my{" "}
              <InlineLink href={profile.resume}>Resume</InlineLink>.
            </p>
          </BlurFade>
          <BlurFade delay={0.6} className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <MapPin className="size-3.5" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-2.5 py-0.5 text-[13px] text-foreground shadow-border backdrop-blur-md dark:bg-white/5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </span>
          </BlurFade>
        </div>
      </Container>
    </section>
  )
}
