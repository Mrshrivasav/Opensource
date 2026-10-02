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
      <h2 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="inline-block font-instrument-serif">
              <span className="text-colorfull animate-gradient-x px-1 pb-1 italic">{accent}</span>
            </span>
          </>
        )}
      </h2>
      {children && <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{children}</p>}
    </div>
  )
}
