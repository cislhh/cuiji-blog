'use client'

import { motion, useScroll } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { Briefcase, Heart, Sparkles } from 'lucide-react'
import { aboutConfig } from '@/data/aboutConfig'

// 从 aboutConfig 中提取数据并分类
const categories = [
  {
    id: 'skills',
    title: '技能',
    icon: Sparkles,
    content: aboutConfig.skills.flatMap((skillGroup) =>
      skillGroup.items.map((item) => ({
        category: skillGroup.category,
        name: item,
      }))
    ),
  },
  {
    id: 'experience',
    title: '经历',
    icon: Briefcase,
    content: aboutConfig.experience.map((exp) => ({
      title: exp.title,
      organization: exp.organization,
      description: exp.description.split('\n')[0], // 只显示第一行作为简介
    })),
  },
  {
    id: 'life',
    title: '生活',
    icon: Heart,
    content: aboutConfig.interests.map((interest) => ({
      name: interest.name,
      icon: interest.icon,
    })),
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
    <section className="relative grid min-h-screen grid-cols-1 bg-gray-900 md:min-h-screen md:grid-cols-13">
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
            <activeData.icon className="mx-auto mb-6 h-16 w-16 text-gray-100" />
            <h2 className="text-3xl font-bold text-gray-100">{activeData.title}</h2>
          </motion.div>
        </div>
      </div>

      {/* 右侧内容区域 - 9fr */}
      <div ref={containerRef} className="px-6 py-20 md:col-span-9 md:px-12">
        {/* 技能部分 */}
        <div className="min-h-[50vh] py-12">
          <h3 className="mb-8 text-2xl font-bold text-gray-100">技能</h3>
          <div className="space-y-6">
            {aboutConfig.skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
                className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-6"
              >
                <h4 className="mb-3 font-semibold text-gray-100">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm text-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 经历部分 */}
        <div className="min-h-[50vh] py-12">
          <h3 className="mb-8 text-2xl font-bold text-gray-100">经历</h3>
          <div className="space-y-6">
            {aboutConfig.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative border-l-2 border-blue-500/30 pl-6"
              >
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-500" />
                <h4 className="text-lg font-bold text-gray-100">{exp.title}</h4>
                <p className="mt-1 text-sm text-gray-400">{exp.organization}</p>
                <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 生活部分 */}
        <div className="min-h-[50vh] py-12">
          <h3 className="mb-8 text-2xl font-bold text-gray-100">生活</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {aboutConfig.interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-700/50 bg-gray-800/30 p-4 transition-all hover:border-blue-500/50 hover:bg-gray-800/50"
              >
                <span className="text-2xl">{interest.icon}</span>
                <span className="text-sm font-medium text-gray-200">{interest.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
