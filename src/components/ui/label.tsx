import * as React from 'react'

import { cn } from '../../lib/utils'

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'ui-label',
      'text-sm font-medium uppercase tracking-[0.18em] text-stone-500',
      className,
    )}
    {...props}
  />
))

Label.displayName = 'Label'
