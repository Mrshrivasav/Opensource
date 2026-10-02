// Source of truth: portfolio-data/portfolio-data.md (extracted from the old site).

export const profile = {
  name: "Diggaj Raj",
  role: "Software Developer · AI Engineer",
  location: "Greater Noida, India",
  avatar: "/profile/avatar.webp",
  email: "amanshriwastava0@gmail.com",
  resume: "/resume.pdf",
  bookCall: "mailto:amanshriwastava0@gmail.com?subject=Let%27s%20book%20a%20call",
}

export const socials = {
  github: "https://github.com/Mrshrivasav",
  x: "https://x.com/Mrshrivasav",
  linkedin: "https://www.linkedin.com/in/mr-diggaj-raj-ab6740277/",
  email: `mailto:${profile.email}`,
}

export type Project = {
  id: string
  title: string
  category: string
  /** Short chip shown on the hover tile. */
  tag: string
  description: string
  /** Tile image. Placeholder frames from the videos for now; swap for real images in public/projects/thumbs. */
  thumbnail: string
  video: string
  poster: string
  github: string
  overview: string
  problem: string
  solution: string
  architecture: string
  features: string[]
  tech: string[]
  challenges: string
  results: string
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "My Portfolio",
    category: "Web App",
    tag: "portfolio",
    description:
      "Personal portfolio built with Next.js, TypeScript, and Tailwind CSS to showcase projects, skills, and AI assistant integrations.",
    thumbnail: "/projects/thumbs/project-1.webp",
    video: "/projects/project-1.mp4",
    poster: "/projects/project-1.webp",
    github: "https://github.com/Mrshrivasav",
    overview:
      "A futuristic personal portfolio built using Next.js, TypeScript, Tailwind CSS, Framer Motion, and modern frontend architecture.",
    problem:
      "Traditional portfolios are static and fail to demonstrate real-time AI integration and modern frontend capabilities.",
    solution:
      "Created a dynamic, AI-powered platform that showcases technical skills through interactive elements and a digital twin assistant.",
    architecture: "Next.js App Router, dynamic JSON datasets, and Three.js for 3D visualizations.",
    features: ["AI Assistant Integration", "Voice Assistant Architecture", "3D Visualizations", "Glassmorphism UI"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    challenges: "Balancing high-end animations with performance and accessibility.",
    results: "A highly engaging portfolio that serves as a live demo of full-stack and AI engineering skills.",
  },
  {
    id: "mental-health",
    title: "AI-Powered Mental Health Detection",
    category: "AI / ML",
    tag: "local LLM",
    description: "Detects mental health trends from social media using a local LLM and AI analysis.",
    thumbnail: "/projects/thumbs/project-2.webp",
    video: "/projects/project-2.mp4",
    poster: "/projects/project-2.webp",
    github: "https://github.com/Mrshrivasav",
    overview:
      "An AI system that detects mental health trends from social media content using local LLMs and machine learning analysis.",
    problem: "Mental health monitoring often compromises user privacy or relies on centralized cloud processing.",
    solution:
      "Implemented a local LLM-based solution that processes data on-device to ensure privacy while providing accurate sentiment analysis.",
    architecture: "Python-based backend with local LLM integration and data processing pipeline.",
    features: ["Sentiment Analysis", "Mental Health Pattern Detection", "AI-Based Classification", "Local Processing"],
    tech: ["Python", "Local LLM", "NLP", "Machine Learning", "PyTorch", "FastAPI"],
    challenges: "Optimizing local model execution for real-time analysis on standard hardware.",
    results: "A privacy-first tool capable of identifying early signs of mental health distress from public data.",
  },
  {
    id: "ecommerce",
    title: "AI-Powered E-Commerce MERN App",
    category: "Web App",
    tag: "e-commerce",
    description: "MERN stack online store with AI-powered recommendations and analytics.",
    thumbnail: "/projects/thumbs/project-3.webp",
    video: "/projects/project-3.mp4",
    poster: "/projects/project-3.webp",
    github: "https://github.com/Mrshrivasav",
    overview: "A full-stack MERN e-commerce platform enhanced with AI-powered recommendations and analytics.",
    problem: "Standard e-commerce sites lack personalized discovery features for users.",
    solution: "Built a recommendation engine that suggests products based on user behavior and preferences.",
    architecture: "MERN Stack (MongoDB, Express, React, Node.js) with integrated AI logic.",
    features: ["Product Management", "Cart System", "Checkout Flow", "AI Recommendations", "Analytics"],
    tech: ["MongoDB", "Express", "React", "Node.js", "AI Recommendation Engine"],
    challenges: "Synchronizing the recommendation engine with real-time user activity.",
    results: "Increased user engagement and personalized shopping experience.",
  },
  {
    id: "jarvis",
    title: "Jarvis Assistant with Local LLM & Face Auth",
    category: "AI / ML",
    tag: "voice AI",
    description: "Personal assistant built with local LLM, face authentication, and voice commands.",
    thumbnail: "/projects/thumbs/project-4.webp",
    video: "/projects/project-4.mp4",
    poster: "/projects/project-4.webp",
    github: "https://github.com/Mrshrivasav",
    overview: "A personal AI assistant combining local language models, biometric authentication, and voice control.",
    problem: "Personal assistants often lack secure, localized authentication and privacy-focused processing.",
    solution:
      "Developed an assistant that uses face recognition for access and processes all commands locally using an LLM.",
    architecture: "Python core with OpenCV for face authentication and localized LLM inference.",
    features: ["Voice Commands", "Face Authentication", "Local AI Processing", "Assistant Automation"],
    tech: ["Python", "Local LLM", "Face Authentication", "Voice Recognition"],
    challenges: "Integrating biometric security seamlessly with voice-controlled automation.",
    results: "A secure, private, and highly responsive personal assistant.",
  },
]

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  source: string
  url: string
  date: string
  category: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-5",
    title: "Anthropic Unveils Claude 3.5 Sonnet",
    excerpt:
      "Claude 3.5 Sonnet raises the industry bar for intelligence, outperforming competitor models and Claude 3 Opus on a wide range of benchmarks.",
    source: "Anthropic Blog",
    url: "https://www.anthropic.com/news/claude-3-5-sonnet",
    date: "2024-06-20",
    category: "AI Models",
  },
  {
    id: "ai-1",
    title: "OpenAI Introduces GPT-4o: A New Frontier in Multimodal AI",
    excerpt:
      "GPT-4o (“o” for “omni”) is a step towards much more natural human-computer interaction—it accepts as input any combination of text, audio, and image.",
    source: "OpenAI Blog",
    url: "https://openai.com/index/hello-gpt-4o/",
    date: "2024-05-13",
    category: "AI Announcements",
  },
  {
    id: "ai-2",
    title: "The Future of Machine Learning: Trends to Watch in 2024",
    excerpt:
      "From Generative AI to Edge Computing, explore the key trends that are shaping the future of machine learning and data science this year.",
    source: "Towards AI",
    url: "https://towardsai.net/p/machine-learning/the-future-of-machine-learning-trends-to-watch-in-2024",
    date: "2024-04-20",
    category: "ML Trends",
  },
  {
    id: "ai-3",
    title: "Large Language Models: A Comprehensive Guide",
    excerpt:
      "Understanding the architecture, training process, and applications of LLMs that are revolutionizing the way we interact with technology.",
    source: "Analytics Vidhya",
    url: "https://www.analyticsvidhya.com/blog/2023/07/large-language-models/",
    date: "2024-03-15",
    category: "LLMs",
  },
  {
    id: "ai-4",
    title: "Deep Learning vs. Traditional Machine Learning",
    excerpt:
      "A deep dive into the differences between deep learning and classical ML, and when to use which approach for your specific data problems.",
    source: "Towards Data Science",
    url: "https://towardsdatascience.com/deep-learning-vs-traditional-machine-learning-430932130e92",
    date: "2024-02-10",
    category: "Deep Learning",
  },
  {
    id: "ai-6",
    title: "Understanding Neural Networks from Scratch",
    excerpt:
      "A step-by-step guide to building and understanding the fundamental building blocks of modern artificial intelligence: the neural network.",
    source: "Medium",
    url: "https://medium.com/topic/machine-learning",
    date: "2024-01-25",
    category: "Fundamentals",
  },
]

export type Experience = {
  title: string
  org: string
  location: string
  period: string
  icon: "rocket" | "brain" | "code"
  points: string[]
}

export const experiences: Experience[] = [
  {
    title: "IIT Bombay E-Cell Participation",
    org: "Galgotias University Startup Center",
    location: "Gautam Buddh Nagar",
    period: "Aug 2025 – Sep 2025",
    icon: "rocket",
    points: [
      "Guided peers in AIML development, integrating advanced models to support innovation initiatives.",
      "Supported startups with web and app development, using Docker for scalable and reliable deployments.",
      "Contributed to agentic AI and LLM integration, helping early-stage ventures adopt intelligent automation.",
    ],
  },
  {
    title: "AI & ML Integration in Software",
    org: "Galgotias University Startup Center",
    location: "Gautam Buddh Nagar",
    period: "Jun 2025 – 2025",
    icon: "brain",
    points: [
      "Integrated agentic AI into web applications, enabling autonomous task execution.",
      "Implemented large language models (LLMs) for contextual chat, improving user interaction and intelligent content generation.",
      "Developed machine-learning–powered dashboards to enhance personalization, insights, and recommendation systems in web apps.",
    ],
  },
  {
    title: "Software Developer Intern",
    org: "Galgotias University Startup Center",
    location: "Gautam Buddh Nagar",
    period: "Feb 2025 – Apr 2025",
    icon: "code",
    points: [
      "Developed a REST API using FastAPI and PostgreSQL to store and manage data from learning management systems.",
      "Built a full-stack web application using Flask, React, PostgreSQL, and Docker to analyze GitHub data.",
      "Explored and implemented methods to visualize GitHub collaboration in a classroom environment.",
    ],
  },
]

// Add real testimonials here. The section (and its nav link) stays hidden while this list is empty.
export type Testimonial = { quote: string; name: string; role: string }

export const testimonials: Testimonial[] = []
