import { Quote } from "lucide-react"
import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { testimonials, type Testimonial } from "@/data/portfolio"

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2)
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-[min(78vw,300px)] flex-col justify-between gap-5 rounded-[18px] bg-surface p-5 ring-[0.5px] ring-black/15 dark:ring-white/12 transition-[translate,background-color] duration-300 ease-out-quint hover:-translate-y-1 hover:bg-white dark:hover:bg-white/5">
      <div className="space-y-3">
        <Quote className="size-5 text-neutral-400" />
        <blockquote className="font-instrument-serif text-lg leading-snug text-foreground">{t.quote}</blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-primary/5 font-mono text-xs shadow-border">{initials(t.name)}</span>
        <span>
          <span className="block text-sm font-medium">{t.name}</span>
          <span className="block font-mono text-[10px] tracking-wider text-neutral-500 uppercase">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function TestimonialsSection() {
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="scroll-mt-24 py-12 sm:py-14">
      <Container>
        <BlurFade inView>
          <SectionHeading title="What people" accent="say" />
        </BlurFade>
      </Container>
      <Container className="px-0 sm:px-0">
        <BlurFade inView className="group/marquee flex overflow-hidden py-2 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {/* Two identical tracks so the loop is seamless; translateX(-100%) moves exactly one track. */}
          {[0, 1].map((track) => (
            <ul
              key={track}
              aria-hidden={track === 1}
              className="flex shrink-0 animate-marquee items-stretch gap-4 pr-4 group-hover/marquee:[animation-play-state:paused]"
            >
              {testimonials.map((t, i) => (
                <li key={i}>
                  <TestimonialCard t={t} />
                </li>
              ))}
            </ul>
          ))}
        </BlurFade>
      </Container>
    </section>
  )
}
