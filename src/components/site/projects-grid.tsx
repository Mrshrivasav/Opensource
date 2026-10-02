"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { BlurFade } from "@/components/site/blur-fade"
import { ProjectCard } from "@/components/site/project-card"
import { projects } from "@/data/portfolio"
import { cn } from "@/lib/utils"

/**
 * Hovering a tile blurs and dims the rest of the page: a fixed overlay sits above
 * everything (navbar included) and only the hovered tile's wrapper is raised above it.
 */
export function ProjectsGrid() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <>
      <AnimatePresence>
        {activeId && (
          <motion.div
            aria-hidden
            key="focus-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-[60] bg-black/20 backdrop-blur-[5px] dark:bg-black/35"
          />
        )}
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <BlurFade
            key={project.id}
            inView
            delay={(i % 2) * 0.1}
            // The wrapper (not the tile) must be raised: BlurFade's transform/filter makes it a stacking context.
            className={cn("relative", activeId === project.id && "z-[70]")}
          >
            <ProjectCard
              project={project}
              active={activeId === project.id}
              onActiveChange={(active) =>
                setActiveId((current) => (active ? project.id : current === project.id ? null : current))
              }
            />
          </BlurFade>
        ))}
      </div>
    </>
  )
}
