"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProjectVideo } from "@/components/site/project-video"
import type { Project } from "@/data/portfolio"
import { getTechIcon } from "@/lib/tech-icons"

// Nested radii: inner = outer (18px) − padding (6px).
const outer = "rounded-[18px]"
const pad = "p-1.5"
const inner = "rounded-[12px]"
const hairline = "ring-[0.5px] ring-black/15 dark:ring-white/12"

// Dashed rule colour shared by the card and modal borders/dividers.
const rule = "border-black/15 divide-black/15 dark:border-white/15 dark:divide-white/15"
const tagClass =
  "inline-block rounded-md bg-amber-500/12 px-1.5 py-0.5 font-plex text-[11px] leading-none text-amber-700 dark:text-amber-400"

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="font-plex text-[11px] tracking-wider text-neutral-500">{label}</p>
      <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{children}</div>
    </div>
  )
}

const footerLink =
  "flex h-11 items-center justify-center gap-2 font-plex text-sm text-neutral-600 outline-none transition-colors hover:text-foreground focus-visible:text-foreground dark:text-neutral-400 dark:hover:text-white"

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  // Focus the top of the modal on open; by default focus jumps to the GitHub button and scrolls to the bottom.
  const topRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <article className={`group/card flex h-full flex-col border border-dashed border-black/15 bg-surface/60 p-1.5 transition-colors duration-300 hover:border-black/30 dark:border-white/15 dark:bg-white/[0.02] dark:hover:border-white/30 ${outer}`}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${project.title}: view details`}
          className={`relative block aspect-video w-full overflow-hidden bg-neutral-200 outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-neutral-900 ${inner} ${hairline}`}
        >
          <Image
            src={project.thumbnail}
            alt=""
            fill
            sizes="(min-width: 640px) 360px, 100vw"
            className="object-cover transition-transform duration-700 ease-out-quint group-hover/card:scale-[1.03]"
          />
          {/* Dims the thumbnail so it sits back from the text; lifts on hover. */}
          <span aria-hidden className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover/card:bg-black/15" />
        </button>

        <div className="flex flex-1 flex-col px-2 pt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-plex text-base leading-snug font-normal tracking-tight text-foreground">
              {project.title}{" "}
              <span className={`ml-0.5 translate-y-[-2px] align-middle ${tagClass}`}>
                {project.tag}
              </span>
            </h3>
            <span className="shrink-0 pt-0.5 font-plex text-xs text-neutral-500">{project.category}</span>
          </div>
          <p className="mt-2 font-plex text-[13px] leading-relaxed normal-case text-neutral-600 dark:text-neutral-400">{project.description}</p>
        </div>

        <div className="mx-2 mt-4 grid grid-cols-2 divide-x divide-dashed divide-black/15 border-t border-dashed border-black/15 dark:divide-white/15 dark:border-white/15">
          <button type="button" onClick={() => setOpen(true)} className={footerLink}>
            Details
          </button>
          <a href={project.github} target="_blank" rel="noreferrer" className={footerLink}>
            GitHub <FaGithub className="size-3.5" />
          </a>
        </div>
      </article>

      <DialogContent
        initialFocus={topRef}
        className={`max-h-[90dvh] gap-0 overflow-y-auto border border-dashed border-black/15 bg-surface ${pad} ring-0 sm:max-w-2xl dark:border-white/15 ${outer} [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:z-10 [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-white/70 [&>[data-slot=dialog-close]]:backdrop-blur-md dark:[&>[data-slot=dialog-close]]:bg-black/40`}
      >
        <div ref={topRef} tabIndex={-1} className="outline-none">
          <div className={`relative aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-900 ${inner} ${hairline}`}>
            <ProjectVideo src={project.video} poster={project.poster} />
          </div>
        </div>

        <div className="space-y-7 px-3.5 pt-6 pb-2 sm:px-5">
          <header className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-plex text-xs text-neutral-500">{project.category}</span>
              <span className={tagClass}>{project.tag}</span>
            </div>
            <DialogTitle className="font-plex text-xl leading-snug font-normal tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.overview}
            </DialogDescription>
          </header>

          {/* 2×2 on wide screens, stacked on mobile; dashed rules between cells. */}
          <div className={`grid overflow-hidden rounded-[12px] border border-dashed bg-background/60 sm:grid-cols-2 dark:bg-white/[0.02] ${rule}`}>
            {(
              [
                ["Problem", project.problem],
                ["Solution", project.solution],
                ["Architecture", project.architecture],
                ["Challenges", project.challenges],
              ] as const
            ).map(([label, text]) => (
              <div key={label} className={`border-dashed p-4 not-last:border-b sm:odd:border-r sm:nth-[n+3]:border-b-0 ${rule}`}>
                <Block label={label}>{text}</Block>
              </div>
            ))}
          </div>

          <Block label="Key features">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="grid size-4.5 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Tech stack">
            <ul className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => {
                const { icon: Icon, className } = getTechIcon(t)
                return (
                  <li key={t} className={`inline-flex items-center gap-1.5 rounded-md bg-current/10 px-2 py-1 font-plex text-xs normal-case ${className}`}>
                    <Icon className="size-3.5 shrink-0" />
                    {t}
                  </li>
                )
              })}
            </ul>
          </Block>

          <div className={`rounded-[12px] border border-dashed bg-blue-500/[0.04] p-4 ${rule}`}>
            <Block label="Results">
              <p className="text-[15px] text-foreground">{project.results}</p>
            </Block>
          </div>
        </div>

        <div className={`mx-3.5 mt-4 grid grid-cols-2 divide-x divide-dashed border-t border-dashed sm:mx-5 ${rule}`}>
          <DialogClose className={footerLink}>Close</DialogClose>
          <a href={project.github} target="_blank" rel="noreferrer" className={footerLink}>
            GitHub <FaGithub className="size-3.5" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
