import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogList } from "@/components/site/blog-list"
import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { blogPosts } from "@/data/portfolio"

export function BlogsSection() {
  return (
    <section id="blogs" className="scroll-mt-24 py-12 sm:py-14">
      <Container>
        <BlurFade inView>
          <SectionHeading title="From the" accent="blog">
            Reading notes on AI and machine learning: models, trends and fundamentals worth knowing.
          </SectionHeading>
        </BlurFade>
        <BlogList posts={blogPosts.slice(0, 3)} />
        <BlurFade inView className="mt-8 flex justify-center">
          <Button variant="glass" size="pill" className="border-black/10 pr-4 pl-5 dark:border-white/10" render={<Link href="/blogs" />} nativeButton={false}>
            View all posts <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </BlurFade>
      </Container>
    </section>
  )
}
