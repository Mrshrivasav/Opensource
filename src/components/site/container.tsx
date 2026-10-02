import { cn } from "@/lib/utils"

/** The site's single content column (752px of content at desktop). Every section sits inside it. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[50rem] px-4 sm:px-6", className)} {...props} />
}
