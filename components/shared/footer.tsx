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
    <div className={`py-6 w-full  bg-[#070118]`}>
      <div className='container flex flex-col justify-between md:flex-row px-0'>
        <div className='flex flex-col p-4 gap-6'>
          <Label size={'xl'}>About Us</Label>
          <Label size={'md'}>How it works?</Label>
          <Label size={'md'}>How we started</Label>
          <Label size={'md'}>Blogs</Label>
          <Label size={'md'}>News</Label>
        </div>
        <div className='flex flex-col p-4 gap-6'>
          <Label size={'xl'}>Popular Search</Label>
          <Label size={'md'}>How it works?</Label>
          <Label size={'md'}>How we started</Label>
          <Label size={'md'}>Blogs</Label>
          <Label size={'md'}>News</Label>
        </div>
        <div className='flex flex-col p-4 gap-6'>
          <Label size={'xl'}>Follow us on</Label>
          <div className='flex flex-row'>
            <FiFacebook className='h-10 w-10 p-1 text-primary' />
            <X className='h-10 w-10 p-1 text-primary' />
            <LinkedInLogoIcon className='h-10 w-10 p-1 text-primary' />
          </div>
        </div>

        <div className='flex flex-col p-4 gap-6'>
          <Label size={'xl'}>Contact Us</Label>
          <Link className={'flex flex-row gap-2'} href={'mailto:adviews0422@gmail.com'}>
            <Label>Email:</Label>
            <Label>adviews0422@gmail.com</Label>
          </Link>
        </div>
      </div>
      <div className='flex flex-col'>
        <Label className='text-center'>Copy Right 2024</Label>
      </div>
    </div>
  )
}
