import type { Metadata } from "next"
import { StatusIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Check } from "lucide-react"
import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { bucketList } from "@/data/portfolio"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Bucket list",
  description: "Things Diggaj Raj wants to do, and the ones already ticked off.",
}

export default function BucketListPage() {
  return (
    <section className="pt-24 pb-12 md:pt-28">
      <Container>
        <BlurFade>
          <SectionHeading title="Bucket list">Things I want to do in this lifetime, and the ones already ticked off.</SectionHeading>
        </BlurFade>

        <ol className="rounded-[18px] border border-dashed border-black/15 bg-surface/60 dark:border-white/15 dark:bg-white/[0.02]">
          {bucketList.map((item, i) => (
            <li key={item.title} className="border-dashed border-black/15 not-last:border-b dark:border-white/15">
              <BlurFade inView delay={i * 0.06} className="flex items-center gap-4 px-4 py-4 sm:px-5">
                <span className="w-6 shrink-0 font-plex text-xs text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                {/* The free StatusIcon is a solid ring; dash it (10 segments over its 62.8 length; round caps add ~1.75 to each dash) to match the Hugeicons preview. */}
                {item.done ? (
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                ) : (
                  <HugeiconsIcon icon={StatusIcon} size={20} strokeWidth={1.75} strokeDasharray="2 4.28" className="shrink-0 text-neutral-400 dark:text-neutral-500" />
                )}
                <span className="sr-only">{item.done ? "Done:" : "Not yet:"}</span>
                <span
                  className={cn(
                    "text-[15px] leading-snug",
                    item.done ? "text-neutral-500 line-through decoration-neutral-400/70" : "text-foreground"
                  )}
                >
                  {item.title}
                </span>
              </BlurFade>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
