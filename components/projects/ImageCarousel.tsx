'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from '@/components/Image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectScreenshot } from '@/data/projects/types'

interface ImageCarouselProps {
  images: ProjectScreenshot[]
  initialIndex?: number
}

export default function ImageCarousel({ images, initialIndex = 0 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const currentImage = images[currentIndex]

  if (images.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt || `Screenshot ${currentIndex + 1}`}
              width={1920}
              height={1080}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <p className="mt-3 text-center text-gray-400 text-sm">{currentImage.caption}</p>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary-500 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-75'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                width={160}
                height={90}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
