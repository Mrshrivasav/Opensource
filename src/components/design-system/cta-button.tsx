import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * The "Start a conversation" CTA: a glass pill whose black fill expands
 * out of the arrow circle on hover while the arrow swaps diagonally.
 */
export function CtaButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="cta" size="cta" className={cn("w-fit", className)} {...props}>
      <span className="z-10 flex-1 px-3 text-center text-black transition-colors duration-450 ease-soft group-hover/cta:text-white dark:text-white dark:group-hover/cta:text-black">
        {children}
      </span>
      <span className="absolute inset-1 rounded-full bg-black transition-[clip-path] duration-500 ease-soft [clip-path:inset(0_0_0_calc(100%-40px)_round_9999px)] group-hover/cta:[clip-path:inset(0_round_9999px)] dark:bg-white" />
      <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-black p-2.5 transition-colors duration-400 ease-soft group-hover/cta:bg-transparent dark:bg-white">
        <span className="relative size-4 overflow-hidden text-white dark:text-black">
          <ArrowUpRight className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-in-out group-hover/cta:translate-x-0 group-hover/cta:translate-y-0" />
          <ArrowUpRight className="absolute inset-0 size-4 transition-transform duration-500 ease-in-out group-hover/cta:translate-x-full group-hover/cta:-translate-y-full" />
        </span>
      </span>
    </Button>
  )
}
