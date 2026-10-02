"use client"

import { motion } from "motion/react"
import { FaXTwitter } from "react-icons/fa6"
import { socials } from "@/data/portfolio"

/** Floating "Say hi on X" pill pinned to the bottom of the viewport. */
export function SayHiBar() {
  return (
    <motion.a
      href={socials.x}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24, filter: "blur(6px)", x: "-50%" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", x: "-50%" }}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.9 }}
      className="group fixed bottom-5 left-1/2 z-40 flex items-center gap-2 whitespace-nowrap rounded-full bg-white/85 py-1.5 pr-1.5 pl-4 text-sm text-neutral-600 shadow-nav backdrop-blur-md backdrop-saturate-150 dark:bg-neutral-800/85 dark:text-white/70"
    >
      Say hi on
      <span className="grid size-7 place-items-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-12 dark:bg-white dark:text-black">
        <FaXTwitter className="size-3.5" />
      </span>
    </motion.a>
  )
}
