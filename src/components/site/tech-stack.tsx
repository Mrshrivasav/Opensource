import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { getTechIcon } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

/** Overlapping circular tech icons, like an avatar stack. Names appear on hover. */
export function TechStack({ tech, className }: { tech: string[]; className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      {tech.map((name, i) => {
        const { icon: Icon, className: tone } = getTechIcon(name)
        return (
          <Tooltip key={name}>
            <TooltipTrigger
              render={<span />}
              aria-label={name}
              style={{ zIndex: tech.length - i }}
              className="relative -ml-2 grid size-8 place-items-center rounded-full bg-white ring-2 ring-surface shadow-border transition-transform duration-200 ease-out-quint first:ml-0 hover:z-50! hover:-translate-y-1 dark:bg-neutral-800"
            >
              <Icon className={cn("size-3.5", tone)} />
            </TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}
