import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  accent,
  className,
  children,
}: {
  title: string
  accent?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="font-instrument-serif text-4xl italic leading-tight font-normal tracking-tight text-balance text-foreground md:text-[2.75rem]">
        {title}
        {accent && ` ${accent}`}
      </h2>
      {children && <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{children}</p>}
    </div>
  )
}
