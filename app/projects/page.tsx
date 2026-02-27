import ProjectsClient from './ProjectsClient'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '项目' })

export default function Projects() {
  return <ProjectsClient />
}
