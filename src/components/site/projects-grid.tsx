import { BlurFade } from "@/components/site/blur-fade"
import { ProjectCard } from "@/components/site/project-card"
import { projects } from "@/data/portfolio"

export function ProjectsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project, i) => (
        <BlurFade key={project.id} inView delay={(i % 2) * 0.1} className="h-full">
          <ProjectCard project={project} />
        </BlurFade>
      ))}
    </div>
  )
}
