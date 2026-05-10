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
        xs: 'text-xs text-gray-500 leading-relaxed',
        sm: 'text-sm text-gray-500 leading-relaxed',
        md: 'text-sm text-gray-700 leading-relaxed',
        lg: 'text-lg text-semibold leading-relaxed',
        xl: 'text-2xl text-bold leading-relaxed',
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
