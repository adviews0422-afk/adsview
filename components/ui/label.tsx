'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Define labelVariants with different sizes
const labelVariants = cva(
  'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      size: {
        xs: 'text-xs text-slate-400 leading-relaxed',
        sm: 'text-sm text-slate-400 leading-relaxed',
        md: 'text-sm text-slate-400',
        lg: 'text-lg font-bold text-slate-400',
        xl: 'text-xl text-primary',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

// Define the Label component with size variant
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, size, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ size }), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
