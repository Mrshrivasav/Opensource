"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const demos = [
  {
    name: "rise-in",
    spec: "0.7s · ease-out-quint · translateY(14px) → 0",
    render: () => <p className="animate-rise-in font-mono text-[10px] tracking-[0.28em] text-black/80 uppercase dark:text-white/70">Full stack engineer</p>,
  },
  {
    name: "headline-in",
    spec: "0.95s · ease-out-expo · translateY(22px) → 0",
    render: () => <p className="animate-headline-in font-instrument-serif text-4xl tracking-tight">Diggaj Raj</p>,
  },
  {
    name: "mask-sweep",
    spec: "1.8s · ease-sweep · mask-size 0 → 200%",
    render: () => (
      <p className="mask-sweep animate-mask-sweep font-instrument-serif text-4xl tracking-tight">
        <span className="text-colorfull animate-gradient-x px-1 italic">engineer</span>
      </p>
    ),
  },
  {
    name: "draw-in",
    spec: "0.9s · ease-out-expo · scaleX(0) → 1",
    render: () => <span className="block h-px w-40 origin-left animate-draw-in bg-linear-to-r from-blue-500 via-blue-400 to-blue-500/0" />,
  },
  {
    name: "shiny-text",
    spec: "2s · infinite · masked highlight sweep",
    render: () => <span className="shiny-text text-black/65 dark:text-white/90">Feel every keystroke</span>,
  },
  {
    name: "gradient-x",
    spec: "6s · infinite · background-position 0 → 100%",
    render: () => <span className="bg-colorfull animate-gradient-x block h-3 w-40 rounded-full" />,
  },
]

export function MotionDemos() {
  const [run, setRun] = useState(0)

  return (
    <div className="space-y-4">
      <Button variant="elevated" size="pill" onClick={() => setRun((r) => r + 1)}>
        <RotateCcw /> Replay animations
      </Button>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((d) => (
          <Card key={d.name} className="bg-surface ring-border">
            <CardContent className="flex min-h-28 items-center justify-center" key={run}>
              {d.render()}
            </CardContent>
            <CardContent className="space-y-0.5 border-t border-border pt-3">
              <p className="font-mono text-xs">animate-{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.spec}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
