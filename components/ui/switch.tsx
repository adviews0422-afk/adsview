'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'default'
}) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      data-size={size}
      className={cn(
        'peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors outline-none',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        'data-[size=default]:h-5 data-[size=default]:w-9',
        'data-[size=sm]:h-4 data-[size=sm]:w-7',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow transition-transform',
          'data-[size=default]:size-4 data-[size=sm]:size-3',
          'translate-x-0.5 data-[state=checked]:translate-x-4',
          'data-[size=sm]:data-[state=checked]:translate-x-3',
        )}
        data-size={size}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
