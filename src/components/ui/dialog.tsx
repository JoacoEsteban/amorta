import * as React from 'react'
import { useEffect, useCallback } from 'react'

import { cn } from '../../lib/utils'

export type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

export const Dialog = ({
  open,
  onOpenChange,
  children,
  className,
}: DialogProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      match(event.key)
        .with('Escape', () => onOpenChange(false))
        .otherwise(() => null)
    },
    [onOpenChange],
  )

  useEffect(() => {
    match(open)
      .with(true, () => {
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'
      })
      .otherwise(() => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  return match(open)
    .with(false, () => null)
    .otherwise(() => {
      const container = document.createElement('div')
      container.id = 'dialog-root'
      document.body.appendChild(container)
      const cleanup = () => {
        document.body.removeChild(container)
      }
      setTimeout(cleanup, 0)
      return (
        <div
          className={cn('dialog-overlay')}
          onClick={() => onOpenChange(false)}
        >
          <div
            className={cn('dialog-content', className)}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </div>
        </div>
      )
    })
}

import { match } from 'ts-pattern'

export const DialogContent = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('dialog-inner', className)}>{children}</div>

export const DialogHeader = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('dialog-header', className)}>{children}</div>

export const DialogTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <h3 className={cn('dialog-title', className)}>{children}</h3>

export const DialogDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <p className={cn('dialog-description', className)}>{children}</p>

export const DialogFooter = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('dialog-footer', className)}>{children}</div>

export const DialogClose = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) => (
  <button
    type="button"
    className={cn('dialog-close', className)}
    onClick={onClick}
  >
    {children}
  </button>
)
