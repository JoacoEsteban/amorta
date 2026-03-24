import * as React from 'react'

import { cn } from '../../lib/utils'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'ui-input',
      'flex h-12 w-full rounded-2xl border border-stone-300/80 bg-white px-4 py-3 text-base text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100 disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-500',
      className,
    )}
    {...props}
  />
))

Input.displayName = 'Input'
