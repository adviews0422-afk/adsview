'use client'

import React from 'react'
import AccountMenu from './account-menu'

interface ProviderProps {
  children: React.ReactNode
  toggle: boolean
}
export default function AccountLayout({ children, toggle }: ProviderProps) {
  return (
    <div className={`relative grid grid-cols-6 gap-4 p-4 container`}>
      <div
        className={`min-h-full xl:col-span-1 lg:col-span-2 md:col-span-2 flex flex-col gap-2 relative hidden md:flex shadow-lg`}
      >
        <div className='top-20 sticky w-full p-3group relative overflow-hidden rounded-lg border border-primary/20 bg-[#070118]'>
          <AccountMenu />
        </div>
      </div>
      <div className='flex col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-5 bg-[#070118] p-4 rounded-lg border border-primary/20'>
        {children}
      </div>
    </div>
  )
}
