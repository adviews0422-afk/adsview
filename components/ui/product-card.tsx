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
      className='flex flex-row  gap-4 items-center group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-80' />
      <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30' />

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
