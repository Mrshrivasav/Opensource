import { BrainCircuit, ChevronDown, Code2, Rocket } from "lucide-react"
import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { HoverLift } from "@/components/site/hover-lift"
import { SectionHeading } from "@/components/site/section-heading"
import { experiences, type Experience } from "@/data/portfolio"

const icons: Record<Experience["icon"], { icon: React.ElementType; tone: string }> = {
  rocket: { icon: Rocket, tone: "bg-orange-500 text-white" },
  brain: { icon: BrainCircuit, tone: "bg-indigo-500 text-white" },
  code: { icon: Code2, tone: "bg-sky-500 text-white" },
}

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 py-12 sm:py-14">
      <Container>
        <BlurFade inView>
          <SectionHeading title="Where I've" accent="worked" />
        </BlurFade>

        <ol className="relative">
          {/* Timeline rail through the logo column */}
          <span aria-hidden className="absolute top-6 bottom-6 left-5 w-px bg-border" />
          {experiences.map((exp, i) => {
            const { icon: Icon, tone } = icons[exp.icon]
            return (
              <li key={exp.title} className="relative">
                <BlurFade inView delay={i * 0.1}>
                  <details className="group/exp py-3 [&::-webkit-details-marker]:hidden" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center gap-3.5 [&::-webkit-details-marker]:hidden">
                      <HoverLift lift={2} scale={1.08} rotate={-6} className="relative shrink-0">
                        <span className={`grid size-10 place-items-center rounded-[10px] shadow-border ${tone}`}>
                          <Icon className="size-4.5" />
                        </span>
                      </HoverLift>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold tracking-wide uppercase transition-colors group-hover/exp:text-neutral-600 sm:text-[15px] dark:group-hover/exp:text-neutral-300">{exp.title}</span>
                          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open/exp:rotate-180" />
                        </span>
                        <span className="mt-0.5 flex items-center gap-4">
                          <span className="truncate text-[13px] text-neutral-600 dark:text-neutral-400">{exp.org}</span>
                          <span aria-hidden className="hidden h-px flex-1 border-t border-dashed border-hairline sm:block" />
                          <span className="hidden shrink-0 font-mono text-xs text-neutral-500 sm:block">{exp.period}</span>
                        </span>
                        <span className="mt-1 block font-mono text-xs text-neutral-500 sm:hidden">{exp.period}</span>
                      </span>
                    </summary>
                    <ul className="mt-3 ml-14 space-y-1.5 border-l border-dashed border-hairline pl-4">
                      {exp.points.map((p) => (
                        <li key={p} className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </details>
                </BlurFade>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
