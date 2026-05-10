'use client'

import { LayoutDashboard, X } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaceIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { FiFacebook } from 'react-icons/fi'

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div className={`py-6 w-full bg-slate-100 `}>
      <div className='container flex flex-col justify-between md:flex-row px-0'>
        <div className='flex flex-col p-4'>
          <Label size={'lg'}>About Us</Label>
          <Label size={'md'}>How it works?</Label>
          <Label size={'md'}>How we started</Label>
          <Label size={'md'}>Blogs</Label>
          <Label size={'md'}>News</Label>
        </div>
        <div className='flex flex-col p-4'>
          <Label size={'lg'}>Popular Search</Label>
          <Label size={'md'}>How it works?</Label>
          <Label size={'md'}>How we started</Label>
          <Label size={'md'}>Blogs</Label>
          <Label size={'md'}>News</Label>
        </div>
        <div className='flex flex-col p-4'>
          <Label size={'lg'}>Follow us on</Label>
          <div className='flex flex-row'>
            <FiFacebook className='h-10 w-10 p-1' />
            <X className='h-10 w-10 p-1' />
            <LinkedInLogoIcon className='h-10 w-10 p-1' />
          </div>
        </div>

        <div className='flex flex-col p-4 gap-3'>
          <Label size={'lg'}>Daily News Letter?</Label>
          <Input placeholder='Email Address' />
          <Button className='max-w-[120px]'>Subscribe</Button>
        </div>
      </div>
      <div className='flex flex-col'>
        <Label className='text-center'>Copy Right 2024</Label>
      </div>
    </div>
  )
}
