'use client'
import Lottie from 'lottie-react'
import { HOW_IT_WORKS } from '@/utils/data'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, MoveRight } from 'lucide-react'
import animationData from '@/public/lottie/coin-stack.json'
import { Label } from '@/components/ui/label'
export default function Home() {
  return (
    <div className='w-full flex flex-col justify-center'>
      <div className='w-full bg-slate-100 mb-5'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 py-10'>
          {/* Text Section */}
          <div className='md:w-1/2 w-full flex flex-col'>
            <Label size='xl'>Earn Coins by Completing Simple Tasks</Label>

            <Label size='sm' className='mt-3 leading-relaxed text-slate-600'>
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

          {/* Animation */}
          <div className='md:w-1/3 w-full flex justify-center'>
            <Lottie animationData={animationData} className='w-full max-w-md h-auto' loop={true} />
          </div>
        </div>
      </div>
      <div className='container my-5'>
        <Label size={'xl'}>How Ads View works ?</Label>
        <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3 py-2'>
          {HOW_IT_WORKS.map((item: any, index: number) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className='p-2 rounded-md relative shadow-sm my-2 p-6 border flex flex-col md:flex:row gap-4'
              >
                <Icon className='h-12 w-12 text-white bg-primary p-2 rounded-full p-2' />
                <div className='flex flex-col'>
                  <Label size={'lg'}>{item?.title}</Label>
                  <Label size={'md'}>{item?.description}</Label>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
