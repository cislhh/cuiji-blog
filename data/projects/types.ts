export interface Project {
  id: string
  name: string
  description: string
  type: 'admin' | 'miniprogram' | 'ecommerce' | 'website'
  date: string // 格式: "2025.02"
  image?: string // 项目图片路径
  tags?: string[]
  link?: string
}
