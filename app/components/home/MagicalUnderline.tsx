'use client'

import React from 'react'

interface MagicalUnderlineProps {
  children: React.ReactNode
  className?: string
}

export default function MagicalUnderline({
  children,
  className = '',
}: MagicalUnderlineProps) {
  return (
    <span className={`underline-magical cursor-pointer ${className}`}>
      {children}
    </span>
  )
}
