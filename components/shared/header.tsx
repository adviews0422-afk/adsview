'use client'

import React, { useState } from 'react'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {} from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { PersonIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { List, LogOutIcon, Menu, Search, ShoppingCart, StoreIcon, User } from 'lucide-react'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { DialogDescription } from '../ui/dialog'
import { Label } from '../ui/label'
import { ACCOUNT_MENU } from '@/utils/data'
const Header = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return (
    <div className='z-50  items-center sticky top-0 left-0 bg-white z-10 shadow-sm md:justify-none'>
      <div className='container flex flex-row w-full px-5 py-3 justify-between'>
        <Drawer direction={'left'} open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant='secondary' className='block md:hidden m-0 p-2 bg-slate-100'>
              <Menu className='h-6 w-6 text-primary rounded-full ' />
            </Button>
          </DrawerTrigger>
          <VisuallyHidden>
            <DrawerTitle>Menu</DrawerTitle>
          </VisuallyHidden>
          <DrawerContent className='h-screen top-0 left-0 mt-0 w-[300px] rounded-none'>
            <div className='flex flex-col p-4'>
              {session?.user &&
                ACCOUNT_MENU.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.path

                  return (
                    <Link
                      href={item.path}
                      key={index}
                      onClick={() => setOpen(false)}
                      className={`p-4 gap-4 rounded flex ${isActive ? 'text-primary' : 'text-gray-400'}`}
                    >
                      <Icon className={`h-6 w-6 transition-colors `} />
                      <Label size={'sm'}>{item?.title}</Label>
                    </Link>
                  )
                })}
              {session?.user ? (
                <Label
                  size={'sm'}
                  className='flex flex-row p-4 gap-4'
                  onClick={() => {
                    signOut()
                    setOpen(false)
                  }}
                >
                  <LogOutIcon className={`h-6 w-6 transition-colors `} />
                  Sign Out
                </Label>
              ) : (
                <>
                  <Link
                    href={'/auth/login'}
                    onClick={() => setOpen(false)}
                    className={`p-4 gap-4 rounded flex ${pathname === '/auth/login' ? 'text-primary' : 'text-gray-400'}`}
                  >
                    Login
                  </Link>
                  <Link
                    href={'/auth/register'}
                    onClick={() => setOpen(false)}
                    className={`p-4 gap-4 rounded flex ${pathname === '/auth/register' ? 'text-primary' : 'text-gray-400'}`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </DrawerContent>
        </Drawer>

        <div className='flex flex-row justify-center items-center'>
          <Link className='text-primary space-x-2 flex flex-row mr-5 items-center' href={'/'}>
            <Image src={`/icon.png`} className='object-cover' width={100} height={40} alt='' />
          </Link>
        </div>

        <div className='flex-row space-x-3 p-2 hidden md:flex'>
          {status === 'loading' ? (
            <Skeleton className='w-[40px] h-[40px] md:w-[100px] rounded-full text-end' />
          ) : (
            <>
              {status === 'authenticated' ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex flex-row items-center rounded-full'>
                      <div className='rounded-full bg-slate-100 p-3'>
                        <User className='h-5 w-5 text-primary' />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {ACCOUNT_MENU.map((item) => (
                        <DropdownMenuItem>
                          <Link className='text-decoration-none' href={item.path}>
                            <Label size={'md'} className='px-0'>
                              {item.title}
                            </Label>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onClick={() => {
                          signOut()
                        }}
                      >
                        <Label size={'md'} className='py-0 px-0'>
                          Signout
                        </Label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button onClick={() => router.push('/auth/login')}>Login</Button>
                  <Button variant={'outline'} onClick={() => router.push('/auth/register')}>
                    {' '}
                    Signup
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
