"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

const noop = () => () => {}

/**
 * Muted looping preview that only plays while on screen.
 * The <video> is client-only: video-speed browser extensions inject nodes next to
 * server-rendered videos before hydration, which breaks it. The server sends the poster.
 */
export function ProjectVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const mounted = useSyncExternalStore(noop, () => true, () => false)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [mounted])

  if (!mounted) {
    // eslint-disable-next-line @next/next/no-img-element -- static poster placeholder, swapped for the video on mount
    return <img src={poster} alt="" className={cn("size-full object-cover", className)} />
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={cn("size-full object-cover", className)}
    />
  )
}
