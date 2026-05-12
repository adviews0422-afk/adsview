'use client'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import { Label } from '../ui/label'
import { DASHBOARD_MENU } from '@/utils/data'
import { Icon } from '@radix-ui/react-select'

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
          {DASHBOARD_MENU.map((menu, index) => {
            const Icon = menu.icon
            return (
              <Link
                className={`flex flex-row px-5 py-4 cursor-pointer hover:bg-slate-100 w-full items-center rounded-md ${
                  pathname === menu.path ? 'bg-slate-100' : ''
                }`}
                key={index}
                href={menu.path}
              >
                <Icon
                  style={{ backgroundColor: menu.color }}
                  className={`rounded-md h-8 w-8 mr-2 text-white p-2`}
                />
                <Label size={'md'}>{menu.title}</Label>
              </Link>
            )
          })}
        </div>
      </div>
      <div className='flex col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-5'>{children}</div>
    </div>
  )
}
