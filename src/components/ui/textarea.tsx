import * as React from 'react'
import { cn } from '~/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-xl border-2 border-brand-red-400 bg-background-card px-4 py-3 text-base text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red-400 focus:ring-offset-2 focus:ring-offset-background-dark disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }

