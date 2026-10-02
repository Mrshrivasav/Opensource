"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/design-system/theme-toggle"
import { HoverLift } from "@/components/site/hover-lift"
import { profile, testimonials } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Blogs", href: "/blogs" },
]

const more = [
  { label: "Experience", href: "/#experience" },
  ...(testimonials.length ? [{ label: "Testimonials", href: "/#testimonials" }] : []),
  { label: "Resume", href: profile.resume },
]

const itemClass =
  "relative z-10 flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm whitespace-nowrap outline-none transition-colors duration-200"
const menuItemClass = "rounded-lg px-2.5 py-1.5 text-sm text-neutral-700 dark:text-white/80"
const menuContentClass = "w-44 rounded-xl bg-white/90 p-1.5 shadow-nav ring-0 backdrop-blur-md dark:bg-neutral-800/90"

/** Highlight pill shared by all items; motion animates it between them via layoutId. */
function Pill() {
  return (
    <motion.span
      layoutId="nav-pill"
      className="absolute inset-0 -z-10 rounded-full bg-black/6 dark:bg-white/10"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  )
}

// "More" expands down from the trigger: a clip-path reveal with the items staggering in behind it.
const popupVariants: Variants = {
  closed: {
    opacity: 0,
    y: -6,
    scale: 0.96,
    filter: "blur(4px)",
    clipPath: "inset(0% 0% 100% 0% round 14px)",
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    clipPath: "inset(0% 0% 0% 0% round 14px)",
    transition: { type: "spring", stiffness: 420, damping: 32, staggerChildren: 0.045, delayChildren: 0.06 },
  },
}

const itemVariants: Variants = {
  closed: { opacity: 0, x: -6, filter: "blur(3px)" },
  open: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 500, damping: 30 } },
}

function MoreMenu({
  open,
  onOpenChange,
  highlighted,
  triggerClass,
  onHover,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  highlighted: boolean
  triggerClass: string
  onHover: React.HTMLAttributes<HTMLElement>
}) {
  return (
    <MenuPrimitive.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <MenuPrimitive.Trigger {...onHover} className={triggerClass}>
        {highlighted && <Pill />}
        More
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="flex">
          <ChevronDown className="size-3.5" />
        </motion.span>
      </MenuPrimitive.Trigger>
      <AnimatePresence>
        {open && (
          <MenuPrimitive.Portal keepMounted>
            <MenuPrimitive.Positioner align="end" sideOffset={10} className="z-50 outline-none">
              <MenuPrimitive.Popup
                render={
                  <motion.div
                    variants={popupVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{ transformOrigin: "top right" }}
                  />
                }
                className={cn(menuContentClass, "outline-none")}
              >
                {more.map((m) => (
                  <MenuPrimitive.Item
                    key={m.label}
                    render={<Link href={m.href} />}
                    className={cn(
                      menuItemClass,
                      "group/item flex items-center justify-between outline-none data-highlighted:bg-black/5 dark:data-highlighted:bg-white/10"
                    )}
                  >
                    <motion.span variants={itemVariants} className="flex w-full items-center justify-between">
                      {m.label}
                      <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-data-highlighted/item:translate-x-0 group-data-highlighted/item:opacity-60" />
                    </motion.span>
                  </MenuPrimitive.Item>
                ))}
              </MenuPrimitive.Popup>
            </MenuPrimitive.Positioner>
          </MenuPrimitive.Portal>
        )}
      </AnimatePresence>
    </MenuPrimitive.Root>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)
  const [moreOpen, setMoreOpen] = useState(false)
  const active = links.find((l) => l.href === pathname)?.label ?? null
  // Only one pill may exist at a time (shared layoutId); an open "More" menu keeps it.
  const highlighted = moreOpen ? "More" : (hovered ?? active)

  const tone = (label: string) =>
    highlighted === label
      ? "text-black dark:text-white"
      : "text-neutral-600 hover:text-black dark:text-white/65 dark:hover:text-white"

  const hoverProps = (label: string) => ({
    onMouseEnter: () => setHovered(label),
    onFocus: () => setHovered(label),
  })

  return (
    <header className="fixed inset-x-0 top-2.5 z-50 flex items-center justify-center gap-2 px-4 md:top-4">
      <nav
        onMouseLeave={() => setHovered(null)}
        className="flex items-center rounded-full bg-white/85 p-1 shadow-nav backdrop-blur-md backdrop-saturate-150 dark:bg-neutral-800/85"
      >
        {/* Desktop links */}
        {links.map((l) => (
          <Link key={l.label} href={l.href} {...hoverProps(l.label)} className={cn(itemClass, "hidden md:flex", tone(l.label))}>
            {highlighted === l.label && <Pill />}
            {l.label}
          </Link>
        ))}
        <MoreMenu
          open={moreOpen}
          onOpenChange={setMoreOpen}
          highlighted={highlighted === "More"}
          triggerClass={cn(itemClass, "hidden md:flex", tone("More"))} onHover={hoverProps("More")} />

        {/* Mobile menu */}
        <DropdownMenu>
          <DropdownMenuTrigger {...hoverProps("Menu")} className={cn(itemClass, "md:hidden", tone("Menu"))} aria-label="Open menu">
            {highlighted === "Menu" && <Pill />}
            <Menu className="size-4" /> <span className="max-[380px]:sr-only">Menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={10} className={menuContentClass}>
            {[...links, ...more].map((m) => (
              <DropdownMenuItem key={m.label} className={menuItemClass} render={<Link href={m.href} />}>
                {m.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Raised pill: lighter gradient + top highlight; brightens a touch on hover. */}
        <a
          href={profile.bookCall}
          onMouseEnter={() => setHovered("Book")}
          onFocus={() => setHovered("Book")}
          className={cn(
            "ml-1 flex h-8 shrink-0 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap outline-none transition-[background-color,color,box-shadow] duration-300",
            "bg-black/[0.07] text-neutral-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(0_0_0/0.06)] hover:bg-black/[0.04] hover:text-black",
            "dark:bg-white/[0.16] dark:text-white/80 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_18px_rgb(255_255_255/0.06)] dark:hover:bg-white/[0.22] dark:hover:text-white"
          )}
        >
          Book a Call
        </a>
      </nav>

      <HoverLift rotate={-8}>
        <ThemeToggle className="size-10 [&_svg]:size-4.5" />
      </HoverLift>
    </header>
  )
}
