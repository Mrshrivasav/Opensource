"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const spring = { type: "spring", stiffness: 420, damping: 24, mass: 0.6 } as const

/** Springy lift on hover and press-in on tap. Wrap icons, buttons and small cards. */
export function HoverLift({
  children,
  className,
  lift = 3,
  scale = 1.04,
  rotate = 0,
}: {
  children: React.ReactNode
  className?: string
  lift?: number
  scale?: number
  rotate?: number
}) {
  return (
    <motion.span
      className={cn("inline-flex", className)}
      whileHover={{ y: -lift, scale, rotate }}
      whileTap={{ scale: 0.95 }}
      transition={spring}
    >
      {children}
    </motion.span>
  )
}
