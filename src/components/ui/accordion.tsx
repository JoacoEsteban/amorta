import * as React from 'react'
import { useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '../../lib/utils'

type AccordionProps = {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  children: React.ReactNode
}

export const Accordion = ({
  type = 'multiple',
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}: AccordionProps) => {
  const isControlled = value !== undefined
  const isMultiple = type === 'multiple'

  const getDefault = (): string[] => {
    if (defaultValue === undefined) return []
    if (Array.isArray(defaultValue)) return defaultValue
    return [defaultValue]
  }

  const [internalValue, setInternalValue] = useState<string[]>(getDefault())

  const currentValue = isControlled
    ? Array.isArray(value)
      ? value
      : value
        ? [value]
        : []
    : internalValue

  const handleToggle = useCallback(
    (itemValue: string) => {
      const isOpen = currentValue.includes(itemValue)
      let next: string[]

      if (isOpen) {
        next = currentValue.filter((v) => v !== itemValue)
      } else {
        next = isMultiple ? [...currentValue, itemValue] : [itemValue]
      }

      if (!isControlled) {
        setInternalValue(next)
      }

      onValueChange?.(isMultiple ? next : next[0] ?? '')
    },
    [currentValue, isControlled, isMultiple, onValueChange],
  )

  const childArray = React.Children.toArray(children)

  const enhancedChildren = childArray.map((child) => {
    if (!React.isValidElement(child)) return child
    const childProps = child.props as Record<string, unknown>
    const childValue = (childProps.value ?? childProps.itemValue) as
      | string
      | undefined
    if (!childValue) return child
    const isOpen = currentValue.includes(childValue)
    return React.cloneElement(
      child as React.ReactElement<{ isOpen?: boolean; onToggle?: () => void }>,
      {
        isOpen,
        onToggle: () => handleToggle(childValue),
      },
    )
  })

  return (
    <div className={cn('accordion-root', className)}>{enhancedChildren}</div>
  )
}

export const AccordionItem = ({
  children,
  className,
  value,
  isOpen,
  onToggle,
}: {
  children: React.ReactNode
  className?: string
  value?: string
  isOpen?: boolean
  onToggle?: () => void
}) => (
  <div className={cn('accordion-item', className)}>
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child
      const { displayName } = child.type as { displayName?: string }
      if (displayName === 'AccordionTrigger') {
        return React.cloneElement(
          child as React.ReactElement<{
            isOpen?: boolean
            onToggle?: () => void
          }>,
          {
            isOpen,
            onToggle,
          },
        )
      }
      if (displayName === 'AccordionContent') {
        return React.cloneElement(
          child as React.ReactElement<{ isOpen?: boolean }>,
          {
            isOpen,
          },
        )
      }
      return child
    })}
  </div>
)

AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = ({
  children,
  className,
  isOpen,
  onToggle,
}: {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  onToggle?: () => void
}) => (
  <button
    type="button"
    className={cn('accordion-trigger', className)}
    onClick={onToggle}
    aria-expanded={isOpen}
  >
    <span className="accordion-trigger__text">{children}</span>
    <ChevronDown
      size={18}
      className={cn(
        'accordion-trigger__chevron',
        isOpen ? 'accordion-trigger__chevron--open' : '',
      )}
    />
  </button>
)

AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = ({
  children,
  className,
  isOpen,
}: {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
}) => (
  <div
    className={cn(
      'accordion-content',
      isOpen ? 'accordion-content--open' : 'accordion-content--closed',
      className,
    )}
  >
    <div className="accordion-content__inner">{children}</div>
  </div>
)

AccordionContent.displayName = 'AccordionContent'
