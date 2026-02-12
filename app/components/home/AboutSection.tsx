'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { Briefcase, Heart, Sparkles } from 'lucide-react'

// 数据内容
const categories = [
  {
    id: 'skills',
    title: '技能',
    icon: Sparkles,
    content: [
      { name: 'React / Next.js', level: '精通' },
      { name: 'TypeScript', level: '熟练' },
      { name: 'Tailwind CSS', level: '精通' },
      { name: 'Node.js', level: '熟练' },
      { name: 'Python', level: '了解' },
    ],
  },
  {
    id: 'experience',
    title: '经历',
    icon: Briefcase,
    content: [
      { company: '某科技公司', position: '前端工程师', period: '2023 - 至今' },
      { company: '某互联网公司', position: '实习工程师', period: '2022 - 2023' },
    ],
  },
  {
    id: 'life',
    title: '生活',
    icon: Heart,
    content: [
      { hobby: '阅读', description: '热爱技术和设计类书籍' },
      { hobby: '摄影', description: '记录生活中的美好瞬间' },
      { hobby: '旅行', description: '探索不同的文化和风景' },
    ],
  },
]

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('skills')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // 根据滚动位置切换显示的分类
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.33) {
        setActiveCategory('skills')
      } else if (latest < 0.66) {
        setActiveCategory('experience')
      } else {
        setActiveCategory('life')
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const activeData = categories.find((cat) => cat.id === activeCategory)!

  return (
    <section className="relative grid min-h-screen grid-cols-1 bg-white md:h-screen md:grid-cols-13 dark:bg-gray-900">
      {/* 左侧展示区域 - 4fr */}
      <div className="relative md:col-span-4">
        <div className="sticky top-0 flex h-screen items-center justify-center px-8">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <activeData.icon className="mx-auto mb-6 h-16 w-16 text-gray-900 dark:text-gray-100" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {activeData.title}
            </h2>
          </motion.div>
        </div>
      </div>

      {/* 右侧内容区域 - 9fr */}
      <div ref={containerRef} className="px-6 py-20 md:col-span-9 md:px-12">
        {/* 技能部分 */}
        <div className="min-h-[50vh] py-12">
          <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">技能</h3>
          <div className="space-y-4">
            {categories[0].content.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 经历部分 */}
        <div className="min-h-[50vh] py-12">
          <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">经历</h3>
          <div className="space-y-4">
            {categories[1].content.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {exp.position}
                </h4>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{exp.company}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">{exp.period}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 生活部分 */}
        <div className="min-h-[50vh] py-12">
          <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">生活</h3>
          <div className="space-y-4">
            {categories[2].content.map((life, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">{life.hobby}</h4>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{life.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
