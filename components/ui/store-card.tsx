import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from './button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { ImageIcon, StoreIcon, User } from 'lucide-react'
import { Label } from './label'
import { StoreCardProps } from '@/types/type'
import { Skeleton } from './skeleton'

export default function StoreCard({
  name,
  coverPhoto,
  profilePhoto,
  buttonClick,
  isLoading,
}: StoreCardProps) {
  return (
    <Card
      className='bg-white flex flex-col rounded-lg hover:shadow-lg transition duration-300 cursor-pointer rounded overflow-hidden shadow-md h-full'
      onClick={buttonClick}
    >
      {isLoading ? (
        <Skeleton className='w-full h-[120px]' />
      ) : (
        <>
          {coverPhoto ? (
            <Image
              src={coverPhoto}
              alt='Store Image'
              className='w-full h-[150px] md:h-[150px]'
              quality={80}
              height={100}
              width={100}
            />
          ) : (
            <div className='w-full h-[90px] md:h-[150px] flex items-center justify-center bg-slate-100'>
              <ImageIcon className='text-gray-400' />
            </div>
          )}
        </>
      )}

      <CardContent className='p-4 flex flex-row space-x-2 items-center w-100'>
        {isLoading ? (
          <div className='flex flex-row gap-2 w-full'>
            <Skeleton className='w-10 h-10 rounded-full' />
            <Skeleton className='w-10 w-[70%] ' />
          </div>
        ) : (
          <>
            <Avatar>
              <AvatarImage src={profilePhoto} />
              <AvatarFallback>
                <StoreIcon className='text-gray-400' />
              </AvatarFallback>
            </Avatar>
            <CardTitle>
              <Label size={'lg'}>{name}</Label>
            </CardTitle>
          </>
        )}
      </CardContent>
    </Card>
  )
}
