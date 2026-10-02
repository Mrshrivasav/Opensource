import { BlurFade } from "@/components/site/blur-fade"
import { Container } from "@/components/site/container"
import { ProjectCard } from "@/components/site/project-card"
import { SectionHeading } from "@/components/site/section-heading"
import { projects } from "@/data/portfolio"

export function ProjectsSection() {
  return (
    <section id="work" className="scroll-mt-24 py-12 sm:py-14">
      <Container>
        <BlurFade inView>
          <SectionHeading title="Featured" accent="projects">
            Products and experiments that pair solid architecture with expressive interfaces, from local LLM assistants to
            full-stack MERN apps.
          </SectionHeading>
        </BlurFade>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <BlurFade key={project.id} inView delay={(i % 2) * 0.1} className="h-full">
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  )
}
