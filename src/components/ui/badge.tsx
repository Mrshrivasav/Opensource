import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        // aayushbharti.in variants
        new: "h-auto rounded-full bg-blue-700 px-1.5 text-xs leading-relaxed font-normal text-white",
        tech: "h-auto rounded-md bg-primary/5 px-2 py-1 font-mono text-[10px] font-medium tracking-wide text-neutral-600 uppercase shadow-border sm:px-2.5 sm:py-[5px] sm:text-[11px] dark:text-neutral-300",
        hairline:
          "h-auto rounded-full border-hairline bg-secondary px-3 py-1 font-mono text-[10px] font-normal tracking-wider text-neutral-600 uppercase shadow-border [a]:hover:bg-secondary/90 dark:text-neutral-400",
        index: "h-auto rounded-none px-0 font-mono text-[10px] font-normal tracking-wider text-neutral-600 uppercase dark:text-neutral-400",
        glass:
          "h-auto rounded-full border-white/20 bg-white/40 px-3 py-1 text-xs text-foreground shadow-border backdrop-blur-md backdrop-saturate-150 dark:border-white/10 dark:bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
