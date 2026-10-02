import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, Check, Command, Mail, Plus, Search, Sparkles, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { CtaButton } from "@/components/design-system/cta-button"
import { MotionDemos } from "@/components/design-system/motion-demos"
import { ThemeToggle } from "@/components/design-system/theme-toggle"

export const metadata: Metadata = {
  title: "Design System",
  description: "Tokens, typography and components adapted from aayushbharti.in.",
  // Internal reference for the dev team: unlinked and kept out of search results.
  robots: { index: false, follow: false },
}

const sections = [
  ["colors", "Colors"],
  ["typography", "Type"],
  ["buttons", "Buttons"],
  ["badges", "Badges"],
  ["chips", "Chips"],
  ["glass", "Glass"],
  ["shadows", "Shadows"],
  ["surfaces", "Surfaces"],
  ["motion", "Motion"],
] as const

const semanticColors = [
  { name: "canvas", cls: "bg-canvas", light: "#f4f4f4", dark: "#0d0d0f" },
  { name: "background", cls: "bg-background", light: "#f2f3f5", dark: "#121212" },
  { name: "surface", cls: "bg-surface", light: "#f9f9fa", dark: "#171717" },
  { name: "surface-muted", cls: "bg-surface-muted", light: "#eeeef1", dark: "#0f0f0f" },
  { name: "foreground", cls: "bg-foreground", light: "#0a0a0a", dark: "#fafafa" },
  { name: "primary", cls: "bg-primary", light: "#171717", dark: "#e5e5e5" },
  { name: "secondary", cls: "bg-secondary", light: "#f5f5f5", dark: "#27272a" },
  { name: "muted-foreground", cls: "bg-muted-foreground", light: "#737373", dark: "#a1a1a1" },
  { name: "border", cls: "bg-border", light: "#d4d4d4", dark: "#262626" },
  { name: "hairline", cls: "bg-hairline", light: "#d1d5db", dark: "#ffffff24" },
  { name: "ring", cls: "bg-ring", light: "#a1a1a1", dark: "#737373" },
  { name: "destructive", cls: "bg-destructive", light: "#e40014", dark: "#ff6568" },
]

const accentColors = [
  { name: "blue-700", cls: "bg-blue-700", hex: "#1447e6", use: "“New” badge" },
  { name: "blue-500", cls: "bg-blue-500", hex: "#3080ff", use: "Live dot, link glow" },
  { name: "emerald-500", cls: "bg-emerald-500", hex: "#00bb7f", use: "Status · Now" },
  { name: "orange-500", cls: "bg-orange-500", hex: "#fe6e00", use: "Status · Building" },
  { name: "sky-500", cls: "bg-sky-500", hex: "#00a5ef", use: "Status · Writing" },
  { name: "rose-500", cls: "bg-rose-500", hex: "#ff2357", use: "Status · Reach out" },
  { name: "indigo-500", cls: "bg-indigo-500", hex: "#625fff", use: "Hover accent" },
  { name: "black", cls: "bg-black", hex: "#000000", use: "CTA fill (light)" },
]

const neutrals = [
  ["50", "bg-neutral-50"], ["100", "bg-neutral-100"], ["200", "bg-neutral-200"], ["300", "bg-neutral-300"],
  ["400", "bg-neutral-400"], ["500", "bg-neutral-500"], ["600", "bg-neutral-600"], ["700", "bg-neutral-700"],
  ["800", "bg-neutral-800"], ["900", "bg-neutral-900"], ["950", "bg-neutral-950"],
] as const

const typeScale = [
  {
    role: "Display",
    meta: "Instrument Serif · clamp(3rem, 12vw, 4.75rem) · 1.02",
    cls: "font-instrument-serif text-[clamp(3rem,12vw,4.75rem)] leading-[1.02] tracking-tight",
    sample: "Full stack engineer",
  },
  {
    role: "Section heading",
    meta: "Outfit 500 · 48 → 60px · tracking-tight",
    cls: "text-balance text-5xl font-medium tracking-tight md:text-6xl",
    sample: "Curated work",
  },
  {
    role: "Card heading",
    meta: "Bluu Next (stand-in) · 24px bold",
    cls: "font-bluu text-2xl leading-tight font-bold text-neutral-900 dark:text-white",
    sample: "Building in public",
  },
  {
    role: "Serif lede",
    meta: "Instrument Serif · 24 → 30px · neutral-600",
    cls: "font-instrument-serif text-2xl leading-snug text-neutral-600 lg:text-3xl dark:text-neutral-400",
    sample: "I build interfaces that feel fast, reliable and intentional.",
  },
  {
    role: "Title",
    meta: "Outfit 600 · 18px",
    cls: "text-lg leading-snug font-semibold text-neutral-900 dark:text-white",
    sample: "AI-Powered Mental Health Detection",
  },
  {
    role: "Body",
    meta: "Outfit 500 · 16 → 17px",
    cls: "text-base leading-tight font-medium text-foreground lg:text-[17px]",
    sample: "Remote from India, building production web apps with Next.js, React and TypeScript.",
  },
  {
    role: "Body small",
    meta: "Outfit 400 · 14px · relaxed · neutral-600",
    cls: "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400",
    sample: "Detects mental health trends from social media using a local LLM and AI analysis.",
  },
  {
    role: "Quote / light",
    meta: "Outfit 200 · 16px · tracking-tight",
    cls: "text-base font-extralight tracking-tight text-foreground/85",
    sample: "Engineering discipline with product intuition.",
  },
  {
    role: "Eyebrow",
    meta: "Mono · 10px · uppercase · 0.28em",
    cls: "font-mono text-[10px] tracking-[0.28em] text-black/80 uppercase dark:text-white/70",
    sample: "Full stack engineer · India",
  },
  {
    role: "Label",
    meta: "Mono · 12px · uppercase · widest",
    cls: "font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70",
    sample: "Featured projects",
  },
]

const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Python", "MongoDB"]
const filters = ["All", "Web App", "AI / ML", "Mobile", "Open Source"]
const statuses = [
  { label: "Now", cls: "bg-emerald-500" },
  { label: "Building", cls: "bg-orange-500" },
  { label: "Writing", cls: "bg-sky-500" },
  { label: "Reach out", cls: "bg-rose-500" },
]

const shadows = [
  { name: "shadow-border", note: "Hairline edge + top highlight. Inner rim in dark mode.", cls: "shadow-border bg-surface" },
  { name: "shadow-nav", note: "Floating pill: 0 10px 30px -14px / 22% over the hairline.", cls: "shadow-nav bg-white dark:bg-neutral-800" },
  { name: "shadow-screenshot", note: "Project previews: 0 4px 20px / 40% + 0 15px 50px -5px / 50%.", cls: "shadow-screenshot bg-white dark:bg-neutral-800" },
  { name: "ring-1 ring-border", note: "Default card outline. No blur.", cls: "ring-1 ring-border bg-surface" },
  { name: "hover:shadow-lg", note: "CTA hover lift with tinted shadow.", cls: "bg-surface shadow-lg shadow-black/20 dark:shadow-white/10" },
  { name: "glow", note: "blue-500/30 blur-3xl halo behind interactive text.", cls: "bg-surface relative before:absolute before:inset-0 before:-z-10 before:scale-110 before:rounded-[inherit] before:bg-blue-500/30 before:blur-2xl" },
]

const radii = [
  ["rounded-md", "rounded-md"],
  ["rounded-xl", "rounded-xl"],
  ["rounded-2xl", "rounded-2xl"],
  ["rounded-[22px]", "rounded-[22px]"],
  ["rounded-3xl", "rounded-3xl"],
  ["rounded-full", "rounded-full"],
] as const

function SectionHeader({ id, eyebrow, title, accent, children }: {
  id: string
  eyebrow: string
  title: string
  accent: string
  children?: React.ReactNode
}) {
  return (
    <div id={id} className="mb-10 scroll-mt-28">
      <p className="mb-4 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{eyebrow}</p>
      <h2 className="text-4xl font-medium tracking-tight text-balance md:text-5xl">
        {title}{" "}
        <span className="inline-block font-instrument-serif">
          <span className="text-colorfull animate-gradient-x px-1 pb-1 italic">{accent}</span>
        </span>
      </h2>
      {children && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{children}</p>}
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-primary/5 px-1.5 py-0.5 font-mono text-[11px] break-words text-neutral-600 shadow-border dark:text-neutral-300">
      {children}
    </code>
  )
}

function Specimen({ label, code, children, className }: {
  label: string
  code?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className={`flex min-h-24 items-center justify-center rounded-xl bg-surface p-6 ring-1 ring-border ${className ?? ""}`}>
        {children}
      </div>
      <div className="space-y-1 px-1">
        <p className="text-sm font-medium">{label}</p>
        {code && <Code>{code}</Code>}
      </div>
    </div>
  )
}

function HatchDivider() {
  return <div aria-hidden className="my-pagebuilder h-6 border-y border-border bg-hatch" />
}

export default function DesignSystemPage() {
  return (
    <div className="relative">
      {/* Floating nav pill */}
      <header className="fixed top-2.5 z-50 w-full px-4 md:top-4">
        <nav className="mx-auto flex max-w-5xl items-start justify-center gap-3">
          <div className="flex min-h-10 min-w-0 items-center gap-1 rounded-[22px] bg-white/85 px-3 py-1 shadow-nav backdrop-blur-md backdrop-saturate-150 dark:bg-neutral-800/85">
            <a href="#top" className="shrink-0 px-2 py-1.5 font-bluu text-sm">DR</a>
            <Separator orientation="vertical" className="mx-1 h-4" />
            <ul className="flex min-w-0 items-center overflow-x-auto [scrollbar-width:none]">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block px-2 py-1.5 text-sm font-normal whitespace-nowrap text-neutral-700 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-0.5 shrink-0">
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-5xl px-4 pt-32 pb-24">
        {/* Intro */}
        <section className="relative isolate mb-pagebuilder text-center">
          <div aria-hidden className="absolute -top-10 left-1/2 -z-10 size-[min(70vw,520px)] -translate-x-1/2 rounded-full bg-neutral-400/15 blur-3xl dark:bg-neutral-200/5" />
          <div className="mb-6 flex justify-center animate-rise-in">
            <Button variant="glass" size="sm" className="h-auto py-0.5 pr-2 pl-0.5 text-sm" render={<a href="#chips" />} nativeButton={false}>
              <Badge variant="new">New</Badge>
              <span className="shiny-text px-1 text-black/65 dark:text-white/90">Design system v1 · built on shadcn</span>
              <ArrowRight className="size-3.5 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </div>
          <p className="animate-rise-in font-mono text-[10px] tracking-[0.28em] text-black/80 uppercase [animation-delay:0.18s] dark:text-white/70">
            Tokens · Type · Components
          </p>
          <h1 className="mt-3 animate-headline-in font-instrument-serif text-[clamp(3rem,12vw,4.75rem)] leading-[1.02] tracking-tight [animation-delay:0.08s]">
            <span className="pr-[0.12em] pb-[0.15em] text-foreground">Design</span>
            <span className="mask-sweep animate-mask-sweep inline-block pr-[0.12em] pb-[0.08em]">
              <span className="text-colorfull animate-gradient-x px-1 pb-1 italic">system</span>
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl animate-rise-in font-instrument-serif text-2xl leading-snug text-neutral-600 [animation-delay:0.55s] dark:text-neutral-400">
            The visual language of{" "}
            <span className="inline-block bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text pb-[0.15em] text-transparent dark:from-zinc-700 dark:via-zinc-200 dark:to-zinc-50">
              aayushbharti.in
            </span>
            , rebuilt with shadcn and Tailwind.
          </p>
        </section>

        <HatchDivider />

        {/* Colors */}
        <section>
          <SectionHeader id="colors" eyebrow="01 — Foundations" title="Color" accent="tokens">
            A near-monochrome system: neutral canvases and surfaces carry everything, and colour is reserved for status, the “New” badge and the gradient accent word. Toggle the theme to see the dark values.
          </SectionHeader>

          <h3 className="mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">Semantic</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {semanticColors.map((c) => (
              <Card key={c.name} size="sm" className="gap-0 bg-surface py-0 ring-border">
                <div className={`h-20 border-b border-border ${c.cls}`} />
                <CardContent className="space-y-1 py-3">
                  <p className="font-mono text-xs">--{c.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">
                    <span className="dark:hidden">{c.light}</span>
                    <span className="hidden dark:inline">{c.dark}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="mt-10 mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">Accents</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {accentColors.map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-xl bg-surface p-3 ring-1 ring-border">
                <span className={`size-10 shrink-0 rounded-lg shadow-border ${c.cls}`} />
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.use}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-10 mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">Neutral ramp</h3>
          <div className="flex overflow-hidden rounded-xl ring-1 ring-border">
            {neutrals.map(([step, cls]) => (
              <div key={step} className="flex-1">
                <div className={`h-14 ${cls}`} />
                <p className="bg-surface py-1.5 text-center font-mono text-[10px] text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-10 mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">Gradients</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Specimen label="Colorful accent" code="text-colorfull · 288deg #ff8000 → #ff00cc → #0044ff">
              <div className="w-full space-y-3 text-center">
                <div className="bg-colorfull animate-gradient-x h-3 rounded-full" />
                <p className="font-instrument-serif text-3xl"><span className="text-colorfull animate-gradient-x italic">engineer</span></p>
              </div>
            </Specimen>
            <Specimen label="Name gradient" code="bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text">
              <p className="inline-block bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text font-instrument-serif text-4xl text-transparent dark:from-zinc-700 dark:via-zinc-200 dark:to-zinc-50">
                Diggaj Raj
              </p>
            </Specimen>
          </div>
        </section>

        <HatchDivider />

        {/* Typography */}
        <section>
          <SectionHeader id="typography" eyebrow="02 — Foundations" title="Type" accent="scale">
            Outfit carries the interface, Instrument Serif adds editorial warmth for display text and ledes, and a mono face labels everything in small caps. The site self-hosts Bluu Next and Core Mono; DM Serif Display and Geist Mono stand in for them here.
          </SectionHeader>

          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Outfit", role: "Sans · UI & body", cls: "font-sans" },
              { name: "Instrument Serif", role: "Display · ledes", cls: "font-instrument-serif" },
              { name: "Bluu Next*", role: "Card headings", cls: "font-bluu" },
              { name: "Core Mono*", role: "Labels · eyebrows", cls: "font-mono" },
            ].map((f) => (
              <Card key={f.name} className="bg-surface ring-border">
                <CardContent>
                  <p className={`text-5xl ${f.cls}`}>Aa</p>
                  <p className="mt-3 text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="divide-y divide-border overflow-hidden rounded-xl bg-surface ring-1 ring-border">
            {typeScale.map((t) => (
              <div key={t.role} className="grid gap-3 p-5 md:grid-cols-[200px_1fr] md:items-center md:gap-8">
                <div className="space-y-1">
                  <p className="font-mono text-[10px] tracking-wider text-neutral-600 uppercase dark:text-neutral-400">{t.role}</p>
                  <p className="text-xs text-muted-foreground">{t.meta}</p>
                </div>
                <p className={`min-w-0 break-words ${t.cls}`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </section>

        <HatchDivider />

        {/* Buttons */}
        <section>
          <SectionHeader id="buttons" eyebrow="03 — Components" title="Buttons" accent="& actions">
            Every button is the shadcn <Code>Button</Code> with new Tailwind <Code>cva</Code> variants: <Code>cta</Code>, <Code>solid</Code>, <Code>elevated</Code>, <Code>frosted</Code> and <Code>glass</Code>. Pills and circles only; hover states are fills and scale, never colour shifts.
          </SectionHeader>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Specimen label="CTA · fill reveal" code={'<CtaButton> · variant="cta"'}>
              <CtaButton>Start a conversation</CtaButton>
            </Specimen>
            <Specimen label="Solid" code={'variant="solid" size="pill"'}>
              <Button variant="solid" size="pill">
                <Mail /> Get in touch
              </Button>
            </Specimen>
            <Specimen label="Elevated" code={'variant="elevated" size="pill"'}>
              <Button variant="elevated" size="pill">
                <Search /> Search <kbd className="ml-1 flex items-center gap-0.5 font-mono text-[10px] text-muted-foreground"><Command className="size-3" />K</kbd>
              </Button>
            </Specimen>
            <Specimen label="Elevated · icon" code={'variant="elevated" size="icon-round"'}>
              <div className="flex gap-3">
                <Button variant="elevated" size="icon-round" aria-label="Search"><Search className="size-4.5" /></Button>
                <Button variant="elevated" size="icon-round" aria-label="Sparkle"><Sparkles className="size-4.5" /></Button>
                <Button variant="elevated" size="icon-round" aria-label="Email"><Mail className="size-4.5" /></Button>
              </div>
            </Specimen>
            <Specimen
              label="Frosted · icon"
              code={'variant="frosted" size="icon-round-lg"'}
              className="bg-[radial-gradient(circle_at_30%_40%,#ff8000aa,transparent_55%),radial-gradient(circle_at_70%_60%,#0044ffaa,transparent_55%)]"
            >
              <div className="flex gap-3">
                <Button variant="frosted" size="icon-round-lg" aria-label="Previous"><ArrowRight className="rotate-180" /></Button>
                <Button variant="frosted" size="icon-round-lg" aria-label="Next"><ArrowRight /></Button>
              </div>
            </Specimen>
            <Specimen label="Glass · link" code={'variant="glass"'}>
              <Button variant="glass" size="pill" className="pr-3 pl-4">
                View all projects <ArrowUpRight className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </Button>
            </Specimen>
          </div>

          <h3 className="mt-10 mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">Base shadcn variants · on-brand tokens</h3>
          <div className="flex flex-wrap items-center gap-3 rounded-xl bg-surface p-6 ring-1 ring-border">
            <Button className="rounded-full px-4">Default</Button>
            <Button variant="secondary" className="rounded-full px-4 shadow-border">Secondary</Button>
            <Button variant="outline" className="rounded-full px-4">Outline</Button>
            <Button variant="ghost" className="rounded-full px-4">Ghost</Button>
            <Button variant="destructive" className="rounded-full px-4">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button variant="solid" size="pill" disabled>Disabled</Button>
          </div>

          <h3 className="mt-10 mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">Input pairing</h3>
          <div className="flex max-w-md items-center gap-2 rounded-full bg-surface p-1 pl-4 ring-1 ring-border">
            <Mail className="size-4 shrink-0 text-muted-foreground" />
            <Input
              type="email"
              placeholder="your@email.com"
              className="h-9 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
            />
            <Button variant="solid" size="pill" className="h-9">Subscribe</Button>
          </div>
        </section>

        <HatchDivider />

        {/* Badges */}
        <section>
          <SectionHeader id="badges" eyebrow="04 — Components" title="Badges" accent="& labels">
            The shadcn <Code>Badge</Code> with five added variants. Badges are small, mono and uppercase, and they sit on a hairline instead of a fill.
          </SectionHeader>

          <div className="grid gap-6 sm:grid-cols-2">
            <Specimen label="Tech stack" code={'variant="tech"'}>
              <div className="flex flex-wrap justify-center gap-1.5">
                {techStack.map((t) => <Badge key={t} variant="tech">{t}</Badge>)}
              </div>
            </Specimen>
            <Specimen label="Category · hairline" code={'variant="hairline"'}>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="hairline">Web App</Badge>
                <Badge variant="hairline">AI / ML</Badge>
                <Badge variant="hairline">Open Source</Badge>
              </div>
            </Specimen>
            <Specimen label="New" code={'variant="new"'}>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="new">New</Badge>
                <span className="text-black/65 dark:text-white/90">Nextnode is launching soon</span>
              </div>
            </Specimen>
            <Specimen label="Index + category" code={'variant="index" · variant="hairline"'}>
              <div className="flex items-center gap-3">
                <Badge variant="index">01</Badge>
                <span className="h-px w-8 bg-border" />
                <Badge variant="hairline">Web App</Badge>
              </div>
            </Specimen>
            <Specimen label="Glass" code={'variant="glass"'} className="bg-[radial-gradient(circle_at_20%_50%,#ff00cc66,transparent_60%),radial-gradient(circle_at_80%_50%,#3080ff66,transparent_60%)]">
              <div className="flex gap-2">
                <Badge variant="glass"><Sparkles /> Featured</Badge>
                <Badge variant="glass">2025</Badge>
              </div>
            </Specimen>
            <Specimen label="Base shadcn" code={'default · secondary · outline · destructive'}>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </Specimen>
          </div>
        </section>

        <HatchDivider />

        {/* Chips */}
        <section>
          <SectionHeader id="chips" eyebrow="05 — Components" title="Chips" accent="& status">
            Chips you can click are shadcn <Code>Toggle</Code>s styled with <Code>aria-pressed:</Code> utilities. Status chips use square swatches and a ping dot, as in the site&apos;s hero.
          </SectionHeader>

          <div className="grid gap-6 sm:grid-cols-2">
            <Specimen label="Filter chips" code="<Toggle> + aria-pressed:bg-foreground">
              <div className="flex flex-wrap justify-center gap-2">
                {filters.map((f, i) => (
                  <Toggle
                    key={f}
                    defaultPressed={i === 0}
                    className="h-8 rounded-full bg-background px-3.5 font-mono text-[11px] tracking-wider text-neutral-600 uppercase shadow-border hover:bg-white aria-pressed:bg-foreground aria-pressed:text-background dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10"
                  >
                    {f}
                  </Toggle>
                ))}
              </div>
            </Specimen>
            <Specimen label="Status legend" code="size-2.5 square + mono label">
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
                {statuses.map((s) => (
                  <span key={s.label} className="flex items-center gap-2">
                    <span className={`inline-block size-2.5 shrink-0 ${s.cls}`} />
                    <span className="font-mono text-xs tracking-wide text-foreground/55 uppercase">{s.label}</span>
                  </span>
                ))}
              </div>
            </Specimen>
            <Specimen label="Live / new launch" code="animate-ping dot + animate-draw-in rule">
              <a href="#motion" className="group flex w-fit items-center gap-2.5">
                <span className="relative flex size-1.5 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-500/60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-blue-500" />
                </span>
                <span className="font-mono text-[11px] tracking-[0.28em] text-foreground/65 uppercase">New launch</span>
                <span className="h-px w-10 origin-left animate-draw-in bg-linear-to-r from-blue-500/55 to-blue-500/0 transition-transform duration-[0.55s] ease-out-quint [animation-delay:0.6s] group-hover:scale-x-[2.4]" />
              </a>
            </Specimen>
            <Specimen label="Removable" code={'<Badge variant="hairline"> + icon button'}>
              <div className="flex flex-wrap justify-center gap-2">
                {["React", "Python", "LLMs"].map((t) => (
                  <Badge key={t} variant="hairline" className="gap-1 pr-1">
                    {t}
                    <button type="button" aria-label={`Remove ${t}`} className="rounded-full p-0.5 hover:bg-foreground/10">
                      <X />
                    </button>
                  </Badge>
                ))}
                <Badge variant="outline" className="h-auto rounded-full border-dashed px-3 py-1 font-mono text-[10px] text-muted-foreground uppercase">
                  <Plus /> Add
                </Badge>
              </div>
            </Specimen>
            <Specimen label="Availability" code="emerald ping + glass pill" className="sm:col-span-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm shadow-border backdrop-blur-md dark:bg-white/5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Available for work · IST, overlaps US &amp; EU
                <Check className="size-3.5 text-emerald-500" />
              </span>
            </Specimen>
          </div>
        </section>

        <HatchDivider />

        {/* Glassmorphism */}
        <section>
          <SectionHeader id="glass" eyebrow="06 — Effects" title="Glass" accent="morphism">
            Glass is used sparingly: translucent white (or white/5 in dark mode), a backdrop blur, <Code>backdrop-saturate-150</Code>, and a <Code>shadow-border</Code> hairline in place of a real border.
          </SectionHeader>

          <div className="relative isolate overflow-hidden rounded-3xl bg-surface-muted p-6 ring-1 ring-border sm:p-10">
            <div aria-hidden className="absolute -top-16 -left-10 -z-10 size-72 rounded-full bg-[#ff8000]/50 blur-3xl" />
            <div aria-hidden className="absolute top-1/3 left-1/2 -z-10 size-64 rounded-full bg-[#ff00cc]/40 blur-3xl" />
            <div aria-hidden className="absolute -right-10 -bottom-16 -z-10 size-80 rounded-full bg-[#0044ff]/50 blur-3xl" />

            <div className="mb-8 flex justify-center">
              <div className="flex min-h-10 items-center gap-1 rounded-[22px] bg-white/60 px-4 py-1 shadow-nav backdrop-blur-xl backdrop-saturate-150 dark:bg-neutral-800/60">
                {["Home", "About", "Work", "Blog"].map((l, i) => (
                  <span key={l} className={`px-2 py-1.5 text-sm ${i === 0 ? "text-black dark:text-white" : "text-neutral-700 dark:text-white/70"}`}>{l}</span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { name: "Light", cls: "bg-white/30 backdrop-blur-xs dark:bg-white/5", code: "bg-white/30 backdrop-blur-xs" },
                { name: "Frosted", cls: "bg-white/60 backdrop-blur-md backdrop-saturate-150 dark:bg-white/10", code: "bg-white/60 backdrop-blur-md backdrop-saturate-150" },
                { name: "Heavy", cls: "bg-white/75 backdrop-blur-2xl backdrop-saturate-150 dark:bg-neutral-900/60", code: "bg-white/75 backdrop-blur-2xl backdrop-saturate-150" },
              ].map((g) => (
                <Card key={g.name} className={`shadow-border ring-0 ${g.cls}`}>
                  <CardHeader>
                    <CardTitle className="font-bluu text-xl font-bold">{g.name}</CardTitle>
                    <CardDescription className="text-neutral-700 dark:text-neutral-300">Use over imagery or gradient blobs.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Code>{g.code}</Code>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <CtaButton>Start a conversation</CtaButton>
              <Button variant="frosted" size="icon-round-lg" aria-label="Email"><Mail /></Button>
              <Badge variant="glass"><Sparkles /> Glass badge</Badge>
            </div>
          </div>
        </section>

        <HatchDivider />

        {/* Shadows */}
        <section>
          <SectionHeader id="shadows" eyebrow="07 — Effects" title="Shadow" accent="& depth">
            Depth comes from hairlines rather than blur. <Code>shadow-border</Code> is everywhere; the heavy shadows are kept for floating chrome and screenshots.
          </SectionHeader>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shadows.map((s) => (
              <div key={s.name} className="flex flex-col gap-3">
                <div className="flex h-32 items-center justify-center rounded-xl bg-surface-muted p-6">
                  <div className={`size-full rounded-xl ${s.cls}`} />
                </div>
                <div className="space-y-1 px-1">
                  <Code>{s.name}</Code>
                  <p className="text-xs text-muted-foreground">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <HatchDivider />

        {/* Surfaces & radius */}
        <section>
          <SectionHeader id="surfaces" eyebrow="08 — Patterns" title="Surfaces" accent="& radius">
            A project card built from shadcn <Code>Card</Code>: a surface fill, a <Code>ring-1 ring-border</Code> outline, and a hover that brightens to white and lifts.
          </SectionHeader>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { n: "01", cat: "AI / ML", title: "AI-Powered Mental Health Detection", desc: "Detects mental health trends from social media using a local LLM and privacy-first analysis.", tags: ["Python", "Local LLM", "NLP"] },
              { n: "02", cat: "Web App", title: "AI-Powered E-Commerce MERN App", desc: "MERN stack online store with AI-powered recommendations and analytics.", tags: ["MongoDB", "React", "Node.js"] },
            ].map((p) => (
              <Card
                key={p.n}
                className="group min-h-64 cursor-pointer justify-between bg-surface ring-border transition-[background-color,translate] duration-300 ease-in-out hover:-translate-y-2 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="index">{p.n}</Badge>
                    <Badge variant="hairline">{p.cat}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <h3 className="text-lg leading-snug font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                    {p.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => <Badge key={t} variant="tech">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="mt-10 mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">Radius scale · base 0.625rem</h3>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {radii.map(([label, cls]) => (
              <div key={label} className="space-y-2 text-center">
                <div className={`mx-auto size-16 bg-surface shadow-border ${cls}`} />
                <p className="font-mono text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-10 mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">Hatch gutter</h3>
          <div className="grid h-24 grid-cols-[12px_1fr_12px] overflow-hidden rounded-xl ring-1 ring-border lg:grid-cols-[32px_1fr_32px]">
            <div className="border-r border-border bg-hatch" />
            <div className="flex items-center justify-center bg-surface"><Code>bg-hatch · border-x</Code></div>
            <div className="border-l border-border bg-hatch" />
          </div>
        </section>

        <HatchDivider />

        {/* Motion */}
        <section>
          <SectionHeader id="motion" eyebrow="09 — Effects" title="Motion" accent="& easing">
            Entrances are short, eased and one-shot. Infinite loops are kept for accents only, and everything respects <Code>prefers-reduced-motion</Code>.
          </SectionHeader>
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              ["ease-out-quint", "cubic-bezier(.22,1,.36,1)"],
              ["ease-out-expo", "cubic-bezier(.16,1,.3,1)"],
              ["ease-sweep", "cubic-bezier(.2,.65,.3,.9)"],
              ["ease-soft", "cubic-bezier(.25,.1,.25,1)"],
            ].map(([name, curve]) => (
              <Badge key={name} variant="tech" className="gap-2 normal-case">
                {name} <span className="text-muted-foreground">{curve}</span>
              </Badge>
            ))}
          </div>
          <MotionDemos />
        </section>

        <footer className="mt-pagebuilder flex flex-col items-center gap-6 rounded-3xl bg-surface px-6 py-12 text-center ring-1 ring-border">
          <p className="font-mono text-[10px] tracking-[0.28em] text-black/80 uppercase dark:text-white/70">Ready to build</p>
          <p className="max-w-md font-instrument-serif text-3xl leading-snug">
            Let&apos;s turn ideas into <span className="text-colorfull animate-gradient-x italic">seamless</span> experiences.
          </p>
          <CtaButton render={<a href="mailto:amanshriwastava0@gmail.com" />} nativeButton={false}>
            Start a conversation
          </CtaButton>
        </footer>
      </main>
    </div>
  )
}
