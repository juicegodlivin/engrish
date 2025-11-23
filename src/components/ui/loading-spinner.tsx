import { Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={cn(
          'animate-spin text-brand-red-400',
          sizeClasses[size],
          className
        )}
      />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-darker">
      <LoadingSpinner size="xl" text="Loading very fast ser..." />
    </div>
  )
}

