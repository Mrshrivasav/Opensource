"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProjectVideo } from "@/components/site/project-video"
import type { Project } from "@/data/portfolio"
import { getTechIcon } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

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

/** Muted preview that loads and plays only while `playing`; rewinds when it stops. */
const noopSubscribe = () => () => {}

function HoverVideo({ src, playing }: { src: string; playing: boolean }) {
  // Client-only: video-speed browser extensions inject nodes beside server-rendered videos and break hydration.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (playing) {
      // Fetch the video only on first hover.
      if (!video.getAttribute("src")) video.src = src
      video.play().catch(() => {})
    } else {
      video.pause()
      if (video.getAttribute("src")) video.currentTime = 0
    }
  }, [playing, src, mounted])

  if (!mounted) return null

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      className={cn(
        "absolute inset-0 size-full object-cover transition-opacity duration-500",
        playing ? "opacity-100" : "opacity-0"
      )}
    />
  )
}

export function ProjectCard({
  project,
  active,
  onActiveChange,
}: {
  project: Project
  active: boolean
  onActiveChange: (active: boolean) => void
}) {
  // Focus the top of the modal on open; by default focus jumps to the GitHub button and scrolls to the bottom.
  const topRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog onOpenChange={(open) => open && onActiveChange(false)}>
      {/* The thumbnail is the card. Hover plays the video and reveals the title, description and arrow. */}
      <DialogTrigger
        aria-label={`${project.title}: view details`}
        onPointerEnter={(e) => e.pointerType === "mouse" && onActiveChange(true)}
        onPointerLeave={() => onActiveChange(false)}
        data-active={active || undefined}
        className={`group/tile relative block aspect-[16/10] w-full overflow-hidden bg-neutral-200 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-neutral-900 ${outer} ${hairline}`}
      >
        <Image
          src={project.thumbnail}
          alt=""
          fill
          sizes="(min-width: 640px) 376px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-data-active/tile:scale-[1.03]"
        />
        <HoverVideo src={project.video} playing={active} />

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/35 to-transparent opacity-0 transition-opacity duration-300 group-focus-visible/tile:opacity-100 group-data-active/tile:opacity-100 pointer-coarse:opacity-100"
        />

        <span className="absolute top-3 right-3 grid size-9 scale-75 place-items-center rounded-full bg-white/90 text-black opacity-0 shadow-nav backdrop-blur-md transition-all duration-300 ease-out-quint group-focus-visible/tile:scale-100 group-focus-visible/tile:opacity-100 group-data-active/tile:scale-100 group-data-active/tile:opacity-100 pointer-coarse:scale-100 pointer-coarse:opacity-100">
          <ArrowUpRight className="size-4 transition-transform duration-300 group-data-active/tile:translate-x-px group-data-active/tile:-translate-y-px" />
        </span>

        <span className="absolute inset-x-0 bottom-0 flex translate-y-3 flex-col gap-1 p-4 opacity-0 transition-all duration-400 ease-out-quint group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100 group-data-active/tile:translate-y-0 group-data-active/tile:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100">
          <span className="text-lg leading-snug font-medium tracking-tight text-white">{project.title}</span>
          <span className="line-clamp-2 text-sm leading-relaxed text-white/75">{project.description}</span>
        </span>
      </DialogTrigger>

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
