import { Badge } from "@/components/ui/badge"
import { CtaButton } from "@/components/design-system/cta-button"
import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { HoverLift } from "@/components/site/hover-lift"
import { profile } from "@/data/portfolio"
import { getTechIcon } from "@/lib/tech-icons"

const stack = ["React", "Next.js", "Python", "Node.js", "AI", "TypeScript"]

export function BannerSection() {
  return (
    <section className="py-12 sm:py-14">
      <Container>
        <BlurFade inView>
          <div className="relative isolate overflow-hidden rounded-[24px] bg-surface px-6 py-12 text-center ring-[0.5px] ring-black/15 sm:px-10 sm:py-14 dark:ring-white/12">
            <div aria-hidden className="absolute -top-24 -left-16 -z-10 size-72 rounded-full bg-[#ff8000]/25 blur-3xl dark:bg-[#ff8000]/15" />
            <div aria-hidden className="absolute -right-16 -bottom-24 -z-10 size-80 rounded-full bg-[#0044ff]/25 blur-3xl dark:bg-[#0044ff]/20" />
            <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-56 -translate-1/2 rounded-full bg-[#ff00cc]/15 blur-3xl" />

            <h2 className="mx-auto max-w-xl text-3xl leading-[1.08] font-medium tracking-tight text-balance sm:text-4xl">
              I help founders turn ideas into seamless{" "}
              <span className="font-instrument-serif">
                <span className="text-colorfull animate-gradient-x px-1 italic">digital experiences</span>
              </span>
            </h2>

            <ul className="mt-6 flex flex-wrap justify-center gap-1.5">
              {stack.map((name) => {
                const { icon: Icon, className } = getTechIcon(name)
                return (
                  <li key={name}>
                    <HoverLift rotate={-3}>
                      <Badge variant="tech" className="gap-1.5 bg-white/60 backdrop-blur-md dark:bg-white/5">
                        <Icon className={className} /> {name === "TypeScript" ? "TS" : name}
                      </Badge>
                    </HoverLift>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex justify-center">
              <CtaButton className="text-sm" render={<a href={profile.bookCall} />} nativeButton={false}>
                Book a Call
              </CtaButton>
            </div>
          </div>
        </BlurFade>
      </Container>
    </section>
  )
}
