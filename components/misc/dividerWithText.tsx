import React from 'react'

import { cn } from '@/lib/utils'

type DividerWithTextProps = {
    text?: string
    className?: React.ReactNode
}

export function DividerWithText({text, className}: DividerWithTextProps) {
  return (
    <div className={cn("relative",className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-sm text-gray-500">{text}</span>
      </div>
    </div>
  )
}
