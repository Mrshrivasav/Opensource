"use client"

import { useRef } from "react"
import { ArrowUpRight, Check } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProjectVideo } from "@/components/site/project-video"
import { TechStack } from "@/components/site/tech-stack"
import type { Project } from "@/data/portfolio"
import { getTechIcon } from "@/lib/tech-icons"

// Nested radii: inner = outer (18px) − padding (6px).
const outer = "rounded-[18px]"
const pad = "p-1.5"
const inner = "rounded-[12px]"
const hairline = "ring-[0.5px] ring-black/15 dark:ring-white/12"

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="font-mono text-[10px] tracking-[0.28em] text-black/60 uppercase dark:text-white/50">{label}</p>
      <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{children}</div>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  // Focus the top of the modal on open; by default focus jumps to the GitHub button and scrolls to the bottom.
  const topRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog>
      <Card
        className={`group h-full gap-0 bg-surface py-0 transition-[translate,background-color] duration-300 ease-in-out hover:-translate-y-1 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ${outer} ${hairline}`}
      >
        <div className={`${pad} pb-0`}>
          <div className={`relative aspect-video overflow-hidden bg-neutral-200 shadow-border dark:bg-neutral-900 ${inner}`}>
            <ProjectVideo src={project.video} poster={project.poster} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 px-4 pt-4 pb-4">
          <div className="space-y-1.5">
            <h3 className="text-lg leading-snug font-medium tracking-tight text-neutral-900 dark:text-white">{project.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{project.description}</p>
          </div>
          <TechStack tech={project.tech} className="mt-auto pt-1" />
        </div>

        <DialogTrigger
          render={
            <Button
              variant="ghost"
              className="h-10 w-full rounded-none border-t border-black/8 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-black/4 dark:border-white/8 dark:hover:bg-white/5"
            />
          }
        >
          View details <ArrowUpRight className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
        </DialogTrigger>
      </Card>

      <DialogContent
        initialFocus={topRef}
        className={`max-h-[90dvh] gap-0 overflow-y-auto bg-surface p-0 sm:max-w-2xl ${outer} ${hairline} [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:z-10 [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-white/70 [&>[data-slot=dialog-close]]:backdrop-blur-md dark:[&>[data-slot=dialog-close]]:bg-black/40`}
      >
        <div ref={topRef} tabIndex={-1} className={`${pad} pb-0 outline-none`}>
          <div className={`relative aspect-video overflow-hidden bg-neutral-200 shadow-border dark:bg-neutral-900 ${inner}`}>
            <ProjectVideo src={project.video} poster={project.poster} />
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <div className="space-y-2">
            <DialogTitle className="text-2xl leading-tight font-medium tracking-tight">{project.title}</DialogTitle>
            <DialogDescription className="font-instrument-serif text-lg leading-snug text-neutral-600 dark:text-neutral-400">
              {project.overview}
            </DialogDescription>
          </div>

          <div className="grid gap-5 rounded-[12px] bg-background p-4 shadow-border sm:grid-cols-2">
            <Block label="Problem">{project.problem}</Block>
            <Block label="Solution">{project.solution}</Block>
            <Block label="Architecture">{project.architecture}</Block>
            <Block label="Challenges">{project.challenges}</Block>
          </div>

          <Block label="Key features">
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="grid size-4.5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Check className="size-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Tech stack">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => {
                const { icon: Icon, className } = getTechIcon(t)
                return (
                  <Badge key={t} variant="tech" className="gap-1.5">
                    <Icon className={className} /> {t}
                  </Badge>
                )
              })}
            </div>
          </Block>

          <Block label="Results">
            <p className="font-instrument-serif text-lg text-foreground">{project.results}</p>
          </Block>

          <div className="flex flex-wrap gap-2 border-t border-black/8 pt-5 dark:border-white/8">
            <Button variant="solid" size="pill" className="h-9" render={<a href={project.github} target="_blank" rel="noreferrer" />} nativeButton={false}>
              <FaGithub /> View on GitHub
            </Button>
            <DialogClose render={<Button variant="elevated" size="pill" className="h-9" />}>Close</DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
