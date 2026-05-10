'use client'

import PasswordUpdate from '@/components/forms/password-update'
import ProfileUpdateForm from '@/components/forms/profile-update-form'
import { Separator } from '@/components/ui/separator'
import React from 'react'

import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
function Profile() {
  return (
    <div className='flex items-center w-full h-100 p-0 flex-col'>
      <div className='w-full flex flex-col justify-center items-center '>
        <div className='mt-10 z-10'>
          <Image
            src={``}
            className='border-2 bg-slate-100 rounded-full md:h-[120px] md:w-[120px] h-[90px] w-[90px] object-cover shadow-lg'
            width={120}
            height={120}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col px-5 w-full md:w-[500px]'>
        <ProfileUpdateForm />
        <Separator className='my-4' />
        <Label size={'lg'} className='px-0'>
          Change Password
        </Label>
        <PasswordUpdate />
        <Separator className='my-4' />
        {/*<Label size={'lg'} className='px-0'>
            Account Management
          </Label>
          <Label size={'md'} className='px-0'>
            You can delete your account and personal data associated with it
          </Label>
          <Button variant={'outline'} className='border-red text-red my-3'>
            Delete Account
          </Button>*/}
      </div>
    </div>
  )
}

export default Profile
