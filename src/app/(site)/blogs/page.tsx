import type { Metadata } from "next"
import { BlogList } from "@/components/site/blog-list"
import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { blogPosts } from "@/data/portfolio"

export const metadata: Metadata = {
  title: "Blogs",
  description: "Reading notes on AI and machine learning.",
}

export default function BlogsPage() {
  return (
    <section className="pt-24 md:pt-28">
      <Container>
        <BlurFade>
          <SectionHeading title="All" accent="posts">
            Reading notes on AI and machine learning: models, trends and fundamentals worth knowing.
          </SectionHeading>
        </BlurFade>
        <BlogList posts={blogPosts} />
      </Container>
    </section>
  )
}
