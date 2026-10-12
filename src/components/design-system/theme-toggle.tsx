"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// The theme lives on <html class="dark">, set before paint by the script in layout.tsx.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

const isDark = () => document.documentElement.classList.contains("dark")

/** Current theme, kept in sync with the class on <html>. False on the server. */
export function useIsDark() {
  return useSyncExternalStore(subscribe, isDark, () => false)
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark)
  try {
    localStorage.setItem("theme", dark ? "dark" : "light")
  } catch {}
}

/**
 * Swaps the theme behind a View Transition: the new theme sweeps in sideways over a
 * snapshot of the old one (left to right into dark, right to left back to light).
 * Browsers without the API, and reduced-motion users, get an instant swap.
 */
function switchTheme(dark: boolean) {
  const root = document.documentElement
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme(dark)
    return
  }
  root.dataset.themeSweep = dark ? "to-dark" : "to-light"
  const transition = document.startViewTransition(() => applyTheme(dark))
  transition.finished.finally(() => delete root.dataset.themeSweep)
}

export function ThemeToggle({
  className,
  variant = "elevated",
}: {
  className?: string
  variant?: "elevated" | "ghost"
}) {
  const dark = useIsDark()

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant={variant}
            size="icon-round"
            className={className}
            onClick={() => switchTheme(!dark)}
            aria-label="Toggle theme"
          />
        }
      >
        {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
      </TooltipTrigger>
      <TooltipContent side="bottom">{dark ? "Light mode" : "Dark mode"}</TooltipContent>
    </Tooltip>
  )
}
