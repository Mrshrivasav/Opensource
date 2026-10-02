import type { IconType } from "react-icons"
import {
  SiExpress,
  SiFastapi,
  SiFramer,
  SiHuggingface,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiOpencv,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si"
import { Mic, Sparkles, type LucideIcon } from "lucide-react"

type TechIcon = { icon: IconType | LucideIcon; className: string }

// Brand colours; monochrome marks follow the foreground so they work in both themes.
const icons: Record<string, TechIcon> = {
  "Next.js": { icon: SiNextdotjs, className: "text-foreground" },
  React: { icon: SiReact, className: "text-[#61dafb]" },
  TypeScript: { icon: SiTypescript, className: "text-[#3178c6]" },
  "Tailwind CSS": { icon: SiTailwindcss, className: "text-[#06b6d4]" },
  "Framer Motion": { icon: SiFramer, className: "text-foreground" },
  "Three.js": { icon: SiThreedotjs, className: "text-foreground" },
  Python: { icon: SiPython, className: "text-[#3776ab] dark:text-[#ffd43b]" },
  "Local LLM": { icon: SiOllama, className: "text-foreground" },
  NLP: { icon: SiHuggingface, className: "text-[#ffbd45]" },
  "Machine Learning": { icon: SiScikitlearn, className: "text-[#f7931e]" },
  PyTorch: { icon: SiPytorch, className: "text-[#ee4c2c]" },
  FastAPI: { icon: SiFastapi, className: "text-[#009688]" },
  MongoDB: { icon: SiMongodb, className: "text-[#47a248]" },
  Express: { icon: SiExpress, className: "text-foreground" },
  "Node.js": { icon: SiNodedotjs, className: "text-[#5fa04e]" },
  "AI Recommendation Engine": { icon: Sparkles, className: "text-indigo-500" },
  AI: { icon: Sparkles, className: "text-indigo-500" },
  "Face Authentication": { icon: SiOpencv, className: "text-[#5c3ee8] dark:text-[#8f7bff]" },
  "Voice Recognition": { icon: Mic, className: "text-rose-500" },
}

const fallback: TechIcon = { icon: Sparkles, className: "text-muted-foreground" }

export function getTechIcon(name: string): TechIcon {
  return icons[name] ?? fallback
}
