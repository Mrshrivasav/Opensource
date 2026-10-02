import { cn } from "@/lib/utils"

/** A thin band of diagonal hairlines between sections (after ui.aceternity.com/components/scales). */
export function Scales({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        // Softer than --hairline in both themes so the band recedes behind content.
        "h-8 w-full border-y border-(--scale-line) bg-size-[10px_10px] bg-fixed [--scale-line:#e8e8eb] dark:[--scale-line:#ffffff12]",
        "bg-[repeating-linear-gradient(315deg,var(--scale-line)_0,var(--scale-line)_1px,transparent_0,transparent_50%)]",
        className
      )}
    />
  )
}
