import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/site/blur-fade"
import type { BlogPost } from "@/data/portfolio"

const dateFormat = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" })

export function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((post, i) => (
        <li key={post.id}>
          <BlurFade inView delay={i * 0.08}>
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-1.5 py-5 transition-transform duration-300 ease-out-quint hover:translate-x-1.5 sm:grid-cols-[1fr_auto] sm:gap-10"
            >
              <div className="space-y-1.5">
                <h3 className="flex items-center gap-1 text-base leading-snug font-medium text-foreground transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                  {post.title}
                  <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-neutral-500 uppercase sm:flex-col sm:items-end sm:gap-1 sm:pt-1">
                <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
                <span>{post.source}</span>
              </div>
            </a>
          </BlurFade>
        </li>
      ))}
    </ul>
  )
}
