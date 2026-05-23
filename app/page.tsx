'use client'
import Lottie from 'lottie-react'
import { HOW_IT_WORKS } from '@/utils/data'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, MoveRight } from 'lucide-react'
import animationData from '@/public/lottie/coin-stack.json'
import { Label } from '@/components/ui/label'

export default function Home() {
  return (
    <div className='w-full flex flex-col justify-center bg-gray'>
      <div className='w-full mb-5 bg-[#070118]/10'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 py-10'>
          <div className='md:w-1/2 w-full flex flex-col'>
            <Label size='xl'>Earn Coins by Completing Simple Tasks</Label>

            <Label size='sm' className='mt-3'>
              Turn your spare time into a powerful earning opportunity. Complete quick, simple tasks
              and instantly start stacking coins that unlock real rewards. The more you engage, the
              more you earn—no hassle, no complexity. Redeem your coins anytime for exciting
              rewards, exclusive perks, and instant payouts. Start earning smarter today and make
              every action count.
            </Label>

            <Button variant='outline' className='max-w-[140px] mt-5 flex items-center gap-2'>
              Find Tasks <ArrowRightIcon className='w-4 h-4' />
            </Button>
          </div>

          <div className='md:w-1/3 w-full flex justify-center'>
            <Lottie animationData={animationData} className='w-full max-w-md h-auto' loop={true} />
          </div>
        </div>
      </div>

      <div className='container my-10'>
        <div className='mb-8 flex flex-col items-center text-center'>
          <Label
            size={'xl'}
            className='bg-gradient-to-r from-white to-primary bg-clip-text text-transparent'
          >
            How Ads View works ?
          </Label>

          <div className='mt-2 h-[2px] w-24 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20' />
        </div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 py-12'>
          {HOW_IT_WORKS.map((item: any, index: number) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className='group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-80' />
                <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30' />

                <div className='relative z-10 flex flex-col gap-5'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-sm border border-primary/20 bg-gradient-to-br from-primary to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.45)]'>
                    <Icon className='h-8 w-8 text-white' />
                  </div>
                  <div className='space-y-2'>
                    <Label size={'lg'}>{item?.title}</Label>

                    <Label size={'md'}>{item?.description}</Label>
                  </div>

                  <div className='mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
