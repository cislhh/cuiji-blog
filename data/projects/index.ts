import { Project } from './types'

export const projects: Project[] = [
  {
    id: '1',
    name: '企业后台管理系统',
    description: '基于 React + Ant Design 的企业级后台管理平台',
    type: 'admin',
    date: '2025.01',
    tags: ['React', 'TypeScript', 'Ant Design'],
  },
  {
    id: '2',
    name: '电商管理后台',
    description: '电商平台的订单与商品管理系统',
    type: 'admin',
    date: '2024.11',
    tags: ['Vue3', 'Element Plus', 'Vite'],
  },
  {
    id: '3',
    name: '生活服务小程序',
    description: '提供本地生活服务的微信小程序',
    type: 'miniprogram',
    date: '2024.09',
    tags: ['微信小程序', 'Taro', 'TypeScript'],
  },
  {
    id: '4',
    name: 'B2C 电商平台',
    description: '现代化的前台电商购物网站',
    type: 'ecommerce',
    date: '2024.07',
    tags: ['Next.js', 'Tailwind CSS', 'Stripe'],
  },
  {
    id: '5',
    name: '科技企业官网',
    description: '响应式企业官方网站设计',
    type: 'website',
    date: '2024.05',
    tags: ['React', 'Framer Motion', 'GSAP'],
  },
]
