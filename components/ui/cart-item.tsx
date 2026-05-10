import { Button } from './button'
import { Skeleton } from './skeleton'
import { Minus, Plus, Trash2Icon } from 'lucide-react'

import { CartCardProps } from '@/types/type'
import { DRAFT, OUT_OF_STOCK } from '@/utils/data'
import Image from 'next/image'
import { Label } from './label'

export default function CartItem({
  _id,
  title,
  price,
  image,
  isLoading,
  status,
  value,
  onButtonAddClick,
  onButtonMinusClick,
}: CartCardProps) {
  return (
    <div className='flex flex-row rounded-lg transition duration-300 p-0 m-0 relative rounded items-center'>
      <div className='px-2'>
        {isLoading || !image ? (
          <Skeleton className='w-[60px] h-[60px]' />
        ) : (
          <Image
            src={image}
            alt='cart-item'
            className='max-w-[50px] max-h-[50px] object-fill'
            height={50}
            width={50}
          />
        )}
      </div>
      <div className='p-2 flex flex-col'>
        {isLoading ? (
          <Skeleton className='w-[80px] h-4 my-1' />
        ) : (
          <Label size={'md'} className='px-0 py-2'>
            {title}
          </Label>
        )}
        {isLoading ? (
          <Skeleton className='w-[60px] h-4 ' />
        ) : (
          <Label size={'sm'} className='p-0'>{`₱${price}`}</Label>
        )}

        <Label
          size={'xs'}
          className={`${status == OUT_OF_STOCK || status == DRAFT ? 'text-destructive' : ''}`}
        >
          {status == OUT_OF_STOCK || status == DRAFT ? 'Unavailable' : ''}
        </Label>
      </div>

      <div className='flex flex-row  absolute w-[100px] bottom-1 p bg-white right-2 right-2 gap-2 justify-center items-center rounded-md shadow-lg'>
        {isLoading ? (
          <></>
        ) : (
          <>
            <Plus
              className='h-5 w-5 text-gray-600 cursor-pointer'
              onClick={() => onButtonAddClick()}
            />
            <Label size={'md'}>{value}</Label>
            <>
              {value <= 1 ? (
                <Trash2Icon
                  className='h-5 w-5 text-red-500 cursor-pointer'
                  onClick={() => onButtonMinusClick()}
                />
              ) : (
                <Minus
                  className='h-5 w-5 text-gray-600 cursor-pointer'
                  onClick={() => onButtonMinusClick()}
                />
              )}
            </>
          </>
        )}
      </div>
    </div>
  )
}
