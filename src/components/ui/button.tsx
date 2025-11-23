import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-brand-red-400 to-brand-red-600 hover:from-brand-red-500 hover:to-brand-red-700 text-white shadow-lg shadow-brand-red-500/30 hover:shadow-brand-red-500/60',
        secondary: 'border-2 border-brand-red-400 text-brand-red-400 hover:bg-brand-red-400 hover:text-white bg-transparent',
        gold: 'bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 hover:from-brand-gold-500 hover:to-brand-gold-700 text-black shadow-lg shadow-brand-gold-500/30 hover:shadow-brand-gold-500/60 font-bold',
        ghost: 'hover:bg-background-card text-gray-300 hover:text-white',
        link: 'text-brand-red-400 underline-offset-4 hover:underline',
        outline: 'border-2 border-gray-600 text-gray-300 hover:border-brand-red-400 hover:text-brand-red-400',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-14 px-8 text-lg',
        xl: 'h-16 px-10 text-xl',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

