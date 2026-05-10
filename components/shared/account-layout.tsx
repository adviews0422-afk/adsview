'use client'

import React from 'react'
import AccountMenu from './account-menu'

interface ProviderProps {
  children: React.ReactNode
  toggle: boolean
}
export default function AccountLayout({ children, toggle }: ProviderProps) {
  return (
    <div className={`container relative grid grid-cols-12 gap-0 min-h-screen w-full p-0`}>
      <div className={`md:col-span-3 flex flex-col gap-2 relative hidden md:flex shadow-md`}>
        <div className='sticky w-full p-4 top-10'>
          <AccountMenu />
        </div>
      </div>
      <div className='flex col-span-12 md:col-span-9 w-full'>{children}</div>
    </div>
  )
}
