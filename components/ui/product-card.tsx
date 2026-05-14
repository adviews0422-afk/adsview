import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProductCardProps } from '@/types/type'
import Image from 'next/image'
import { Label } from './label'

export default function ProductCard({
  productName,
  description,
  onClick,
  image,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className='bg-white flex flex-row max-h-sm max-w-100 rounded-lg hover:shadow-lg items-center gap-4 border transition duration-300 p-0 m-0 h-full overflow-hidden'
    >
      <Image
        src={image}
        alt='Product Image'
        height={30}
        width={100}
        className='w-[90px] h-[90px] bg-contain bg-center'
      />
      <Label size={'md'} className='p-0'>
        {productName}
      </Label>
    </div>
  )
}
