'use client'

import Image from './Image'
import Link from './Link'
import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'

const Card = ({ title, description, imgSrc, href }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="md max-w-[544px] p-4 md:w-1/2"
  >
    <div className="glass-panel hover:border-primary-500/30 group h-full overflow-hidden rounded-xl border border-transparent transition-all duration-300 hover:shadow-xl">
      {imgSrc && (
        <div className="relative overflow-hidden">
          <Image
            alt={title}
            src={imgSrc}
            className="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 md:h-36 lg:h-48"
            width={544}
            height={306}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <div className="p-6">
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
          {href ? (
            <Link
              href={href}
              aria-label={`链接到 ${title}`}
              className="hover:text-primary-400 cursor-pointer text-gray-100 transition-colors duration-200"
            >
              {title}
            </Link>
          ) : (
            <span className="text-gray-100">{title}</span>
          )}
        </h2>
        <p className="prose mb-4 line-clamp-2 max-w-none text-gray-400">
          {description}
        </p>
        {href && (
          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="text-primary-400 hover:text-primary-300 inline-flex cursor-pointer items-center gap-2 text-base font-medium transition-colors duration-200"
              aria-label={`链接到 ${title}`}
            >
              查看详情
              <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  </motion.div>
)

export default Card
