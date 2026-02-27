export type ProjectType = 'admin' | 'miniprogram' | 'ecommerce' | 'website' | 'other'
export type OwnershipType = 'company' | 'personal'

export interface ProjectScreenshot {
  src: string
  alt?: string
  caption?: string
}

export interface ProjectHighlight {
  title: string
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription?: string // 模态框中的详细描述
  type: ProjectType
  ownershipType: OwnershipType // company 或 personal
  date: string // 格式: "2024.07"
  coverImage?: string // 卡片封面图
  images: ProjectScreenshot[] // 所有截图
  tags: string[]
  link?: string
  highlights?: ProjectHighlight[] // 项目亮点/挑战
}
