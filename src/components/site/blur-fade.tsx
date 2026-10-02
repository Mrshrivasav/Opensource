"use client"

import { motion, useReducedMotion } from "motion/react"

/**
 * Blur-in entrance: fades up from an 8px blur. Animates on load by default,
 * or when scrolled into view with `inView`.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  inView = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  inView?: boolean
}) {
  const reduce = useReducedMotion()
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(8px)" }
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" }

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(inView
        ? { whileInView: shown, viewport: { once: true, margin: "-80px" } }
        : { animate: shown })}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
