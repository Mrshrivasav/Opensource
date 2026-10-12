import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { certificates, certificatesFolder } from "@/data/portfolio"

export const metadata: Metadata = {
  title: "Certificates",
  description: "Certifications and programmes Diggaj Raj has completed.",
}

// Initials badge per issuer, tinted from a small rotating palette.
const tones = [
  "bg-orange-500/12 text-orange-700 dark:text-orange-400",
  "bg-sky-500/12 text-sky-700 dark:text-sky-400",
  "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  "bg-violet-500/12 text-violet-700 dark:text-violet-400",
  "bg-rose-500/12 text-rose-700 dark:text-rose-400",
]

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")

export default function CertificatesPage() {
  const issuers = [...new Set(certificates.map((c) => c.issuer))]

  return (
    <section className="pt-24 pb-12 md:pt-28">
      <Container>
        <BlurFade>
          <SectionHeading title="Certificates">
            Programmes, courses and competitions I&apos;ve completed along the way, from IIT Guwahati to AWS and Cisco.
          </SectionHeading>
        </BlurFade>

        <ul className="grid gap-3 sm:grid-cols-2">
          {certificates.map((c, i) => (
            <BlurFade key={c.title + c.issuer} inView delay={(i % 2) * 0.08} className="h-full">
              <li className="flex h-full gap-3.5 rounded-[18px] border border-dashed border-black/15 bg-surface/60 p-4 transition-colors duration-300 hover:border-black/30 dark:border-white/15 dark:bg-white/[0.02] dark:hover:border-white/30">
                <span
                  aria-hidden
                  className={`grid size-10 shrink-0 place-items-center rounded-[10px] font-plex text-xs ${tones[issuers.indexOf(c.issuer) % tones.length]}`}
                >
                  {initials(c.issuer)}
                </span>
                <div className="min-w-0">
                  <p className="font-plex text-[11px] tracking-wider text-neutral-500">
                    {c.issuer}
                    {c.year && ` · ${c.year}`}
                  </p>
                  <h2 className="mt-1 text-[15px] leading-snug font-medium tracking-tight text-foreground">{c.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{c.description}</p>
                </div>
              </li>
            </BlurFade>
          ))}
        </ul>

        <BlurFade inView className="mt-8 flex justify-center">
          <Button
            variant="glass"
            size="pill"
            className="border-black/10 pr-4 pl-5 dark:border-white/10"
            render={<a href={certificatesFolder} target="_blank" rel="noreferrer" />}
            nativeButton={false}
          >
            View all proofs <ArrowUpRight className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
          </Button>
        </BlurFade>
      </Container>
    </section>
  )
}
