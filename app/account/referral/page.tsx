'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
function Referral() {
  const { data } = useSession()
  const [copied, setCopied] = useState(false)
  const link = process.env.NEXT_PUBLIC_APP_URL + 'auth/login?referral=' + data?.user?.referralCode

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }
  const steps = [
    {
      step: '01',
      title: 'Share Your Referral Link',
      description: 'Invite your friends using your unique referral link or code.',
    },
    {
      step: '02',
      title: 'Friend Signs Up',
      description: 'Your friend creates an account using your referral link.',
    },
    {
      step: '03',
      title: 'Friend Completes Tasks',
      description:
        'When they start earning coins and completing offers, your referral becomes active.',
    },
    {
      step: '04',
      title: 'Earn Referral Rewards',
      description: 'Receive bonus coins or commission every time your referrals earn.',
    },
  ]

  return (
    <div className='flex w-full h-full flex-col p-4 gap-4'>
      <div className='flex flex-col'>
        <Label size={'lg'}>How Referrals Work</Label>
        <Label size={'sm'}>
          Invite friends to join the platform and earn rewards every time they complete tasks and
          earn coins.
        </Label>
      </div>
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-4'>
        {steps.map((item) => (
          <div
            key={item.step}
            className='group flex flex-col relative overflow-hidden rounded-md border border-primary/10 bg-white p-4 gap-4'
          >
            <div className='flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-lg font-bold text-primary'>
              {item.step}
            </div>
            <div className='flex flex-col'>
              <Label size={'lg'}> {item.title} </Label>
              <Label size={'sm'}> {item.description} </Label>
            </div>
            <div className='absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-md bg-primary/10 blur-3xl transition-all duration-300 group-hover:bg-primary/20' />
          </div>
        ))}
      </div>
      <div className='w-full p-4 rounded-lg border flex gap-3 flex-col md:flex-row justify-between mt-4'>
        <div className='flex flex-col'>
          <Label size='lg'>Refer a friend to earn rewards</Label>
          <Label size='sm'>{link}</Label>
        </div>
        <Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Referral Link'}</Button>
      </div>
    </div>
  )
}

export default Referral
