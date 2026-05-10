'use client'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import { Label } from '../ui/label'

interface ProviderProps {
  children: React.ReactNode
  toggle: boolean
}
export default function DashboardLayout({ children, toggle }: ProviderProps) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div className={`relative grid grid-cols-6 gap-0 min-h-screen p-0`}>
      <div
        className={`xl:col-span-1 lg:col-span-2 md:col-span-2 flex flex-col gap-2 relative hidden md:flex shadow-lg`}
      >
        <div className='sticky w-full p-3 top-10'>
          <div className='py-3'>
            <Link
              className={`p-2 text-sm cursor-pointer font-bolder text-gray-600 flex flex-row gap-2 items-center justify-center md:justify-start hover:bg-slate-100 ${
                pathname === '/dashboard' ? 'bg-slate-100  rounded' : ''
              }`}
              href={'/dashboard'}
            >
              <LayoutDashboard
                className={`h-4 w-4 ${
                  pathname === '/dashboard' ? 'text-primary' : 'text-gray-500'
                }`}
              />
              <Label className='hidden md:block' size={'md'}>
                Dashboard
              </Label>
            </Link>
          </div>
          {/* {DASHBOARD_MENU.map((menu, index) => (
 67bcb5b4be06976077ff0de132315287ace97e24
            <div className='flex flex-col' key={index}>
              <Label size={'md'} className='hidden md:block'>
                {menu.title}
              </Label>
              {menu.items.map((items, index) => {
                const Icon = items.icon
                return (
                  <Link
                    href={items.route}
                    key={index}
                    className={`p-2 text-sm cursor-pointer font-bolder text-gray-600 flex flex-row gap-2 items-center justify-center md:justify-start hover:bg-slate-100 ${
                      pathname === items.route ? 'bg-slate-100  rounded' : ''
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        pathname === items.route ? 'text-primary' : 'text-gray-500'
                      }`}
                    />
                    <Label size={'sm'} className='hidden md:block'>
                      {items.title}
                    </Label>
                  </Link>
                )
              })} 
            </div>
          ))}*/}
        </div>
      </div>
      <div className='flex col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-5'>{children}</div>
    </div>
  )
}
