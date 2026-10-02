import { BannerSection } from "@/components/site/banner-section"
import { BlogsSection } from "@/components/site/blogs-section"
import { ExperienceSection } from "@/components/site/experience-section"
import { Hero } from "@/components/site/hero"
import { ProjectsSection } from "@/components/site/projects-section"
import { Scales } from "@/components/site/scales"
import { TestimonialsSection } from "@/components/site/testimonials-section"

export default function Home() {
  return (
    <>
      <Hero />
      <Scales />
      <ProjectsSection />
      <Scales />
      <BlogsSection />
      <ExperienceSection />
      <Scales />
      <BannerSection />
      <TestimonialsSection />
    </>
  )
}
