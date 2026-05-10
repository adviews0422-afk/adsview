'use client'

import { OrderCardProps, ProductCartProps } from '@/types/type'
import { DRAFT, OUT_OF_STOCK } from '@/utils/data'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useToggle } from '@/hooks/useToggle'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import OrderInfoLayout from '../shared/order-info-layout'
import { useRouter } from 'next/navigation'
import { Separator } from './separator'

export default function OrderCard({ data, isLoading }: OrderCardProps) {
  const [value, toggle, setValue] = useToggle()
  const router = useRouter()
  return (
    <div className='w-full relative rounded bg-white h-full flex flex-col hover:shadow-lg shadow-md '>
      <div className='flex flex-row gap-2 items-center px-4 pt-2'>
        {isLoading ? (
          <>
            <Skeleton className='w-[60px] h-[60px] rounded-full bg-slate-100 shadow-sm' />
            <Skeleton className='w-[120px] h-[30px] rounded bg-slate-100' />
          </>
        ) : (
          <>
            <Image
              src={data.profilePhoto}
              alt='merchant-icon'
              className='w-[60px] h-[60px] rounded-full bg-slate-100 border-2 shadow-sm'
              height={60}
              width={60}
            />
            <Label size={'md'}>{data?.name}</Label>
          </>
        )}
      </div>
      <Separator className='my-4' />
      <div className='flex flex-row gap-2 overflow-auto px-4 '>
        {data?.orderInfo?.products?.map((items: ProductCartProps, index: number) => (
          <div className='flex flex-row w-100 rounded' key={index}>
            {isLoading ? (
              <Skeleton className='w-[60px] h-[60px]' />
            ) : (
              <Image
                src={items?.images?.[0]}
                alt='cart-item'
                className='min-w-[60px] min-h-[60px] rounded bg-slate-100'
                height={60}
                width={60}
              />
            )}
          </div>
        ))}
      </div>

      <div className='flex flex-row justify-between px-4 py-2'>
        {isLoading ? (
          <>
            <Skeleton className='h-[30px] w-[80px]' />
            <Skeleton className='h-[30px] w-[80px]' />
          </>
        ) : (
          <>
            <Label size={'md'}>Total:</Label>
            <Label size={'md'}>P{data?.orderInfo?.total || 0.0}</Label>
          </>
        )}
      </div>

      <div className='absolute top-4 right-4 rounded px-2 py-1'>
        {isLoading ? (
          <Skeleton className='h-[30px] w-[80px]' />
        ) : (
          <Label size={'xs'}>{data?.orderInfo?.status}</Label>
        )}
      </div>
      <div className='flex flex-row gap-4 py-3 bg-slate-100 px-4'>
        {isLoading ? (
          <>
            <Skeleton className='h-[30px] w-[120px]' />
            <Skeleton className='h-[30px] w-[120px]' />
          </>
        ) : (
          <>
            <Button
              className='max-w-[120px]'
              onClick={() => {
                router.push(`/store?storeId=${data?._id}`, { scroll: true })
              }}
            >
              View Store
            </Button>
            <Button
              className='max-w-[120px]'
              variant={'outline'}
              onClick={() => {
                toggle()
              }}
            >
              Order Details
            </Button>
          </>
        )}
      </div>

      <Dialog open={value} onOpenChange={setValue}>
        <DialogContent className={'max-w-[600px] overflow-auto max-h-screen'}>
          <div className='grid gap-4 py-4'>
            <OrderInfoLayout data={data.orderInfo} isLoading={isLoading} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
