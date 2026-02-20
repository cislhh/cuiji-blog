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
    <div className="glass-panel h-full overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary-500/30 group">
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`链接到 ${title}`} className="block cursor-pointer">
            <div className="relative overflow-hidden">
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48 w-full transition-transform duration-300 group-hover:scale-105"
                width={544}
                height={306}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        ) : (
          <div className="relative overflow-hidden">
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48 w-full"
              width={544}
              height={306}
            />
          </div>
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
          {href ? (
            <Link
              href={href}
              aria-label={`链接到 ${title}`}
              className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 cursor-pointer"
            >
              {title}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100">{title}</span>
          )}
        </h2>
        <p className="prose mb-4 max-w-none text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
        {href && (
          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-base font-medium transition-colors duration-200 cursor-pointer"
              aria-label={`链接到 ${title}`}
            >
              查看详情
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        )}
      </div>
    </div>
  </motion.div>
)

export default Card
