import { Mail } from "lucide-react"
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"
import { Container } from "@/components/site/container"
import { profile, socials } from "@/data/portfolio"

const links = [
  { label: "GitHub", href: socials.github, icon: FaGithub },
  { label: "X", href: socials.x, icon: FaXTwitter },
  { label: "LinkedIn", href: socials.linkedin, icon: FaLinkedinIn },
  { label: "Email", href: socials.email, icon: Mail },
]

export function Footer() {
  return (
    <footer className="pt-6 pb-24">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/8 pt-6 sm:flex-row dark:border-white/8">
          <p className="text-[13px] text-neutral-500">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-1">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-8 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
                >
                  <Icon className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
