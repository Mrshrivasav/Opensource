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

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false)

  function toggle() {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant={className ? "ghost" : "elevated"}
            size="icon-round"
            className={className}
            onClick={toggle}
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
