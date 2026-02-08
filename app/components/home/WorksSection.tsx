'use client'

import { motion } from 'motion/react'

interface WorkCardProps {
  title: string
  description: string
  tags: string[]
  link: string
}

function WorkCard({ title, description, tags, link }: WorkCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border-vscode bg-bg-secondary glow-primary-hover h-full p-6 transition-all duration-300">
        <h3 className="text-text-primary mb-3 text-xl font-semibold">{title}</h3>
        <p className="text-text-secondary mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border-vscode-light text-vscode-primary rounded-full px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export default function WorksSection() {
  const projects = [
    {
      title: 'Project Alpha',
      description:
        'A modern web application built with Next.js and TypeScript. Features real-time data synchronization and beautiful UI.',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      link: 'https://github.com/yourusername/project-alpha',
    },
    {
      title: 'Beta Dashboard',
      description:
        'Interactive dashboard for data visualization. Includes charts, filters, and export functionality.',
      tags: ['React', 'D3.js', 'Node.js'],
      link: 'https://github.com/yourusername/beta-dashboard',
    },
    {
      title: 'Gamma CLI',
      description:
        'Command-line tool for automating development workflows. Increases productivity by 10x.',
      tags: ['Go', 'CLI', 'Automation'],
      link: 'https://github.com/yourusername/gamma-cli',
    },
    {
      title: 'Delta API',
      description:
        'RESTful API with authentication, rate limiting, and comprehensive documentation.',
      tags: ['Express', 'MongoDB', 'JWT'],
      link: 'https://github.com/yourusername/delta-api',
    },
  ]

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-text-primary mb-12 text-center text-4xl font-bold"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <WorkCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
