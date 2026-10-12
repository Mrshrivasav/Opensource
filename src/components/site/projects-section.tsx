import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { ProjectsGrid } from "@/components/site/projects-grid"
import { SectionHeading } from "@/components/site/section-heading"

export function ProjectsSection() {
  return (
    <section id="work" className="scroll-mt-24 py-12 sm:py-14">
      <Container>
        <BlurFade inView>
          <SectionHeading title="Featured" accent="projects" />
        </BlurFade>
        <ProjectsGrid />
      </Container>
    </section>
  )
}
