import { Project } from './types'
import { projectsConfig } from '../projectsConfig'

/**
 * Get featured projects for the homepage showcase.
 *
 * If specific project IDs are configured, returns those projects (in the configured order).
 * Otherwise, returns projects sorted by date (descending), limited by maxProjects.
 *
 * @returns Array of featured projects (up to maxProjects)
 */
export function getFeaturedProjects(): Project[] {
  const { projects, featuredWorks } = projectsConfig
  const maxProjects = featuredWorks?.maxProjects ?? 3

  if (featuredWorks?.projectIds && featuredWorks.projectIds.length > 0) {
    // Return projects specified in configuration
    const featured = featuredWorks.projectIds
      .map((id) => projects.find((p) => p.id === id))
      .filter(Boolean) as Project[]

    // Fill with remaining projects if not enough
    if (featured.length < maxProjects) {
      const remaining = projects.filter((p) => !featuredWorks.projectIds?.includes(p.id))
      featured.push(...remaining.slice(0, maxProjects - featured.length))
    }

    return featured.slice(0, maxProjects)
  }

  // Default: sort by date (descending) and take first N
  return [...projects]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, maxProjects)
}
