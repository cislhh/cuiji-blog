import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'
import ProjectsClient from './ProjectsClient'

export const metadata = genPageMetadata({ title: '项目' })

export default function Projects() {
  return <ProjectsClient projectsData={projectsData} />
}
