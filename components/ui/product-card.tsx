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
    <Card
      onClick={onClick}
      className='bg-white flex flex-col max-h-sm max-w-100 rounded-lg hover:shadow-lg border transition duration-300 p-0 m-0 h-full overflow-hidden'
    >
      <CardHeader className='relative bg-primary'>
        <Image
          src={image}
          alt='Product Image'
          height={30}
          width={100}
          className='w-[100px] h-[30px] bg-contain bg-center'
        />
      </CardHeader>
      <CardContent className='flex flex-col p-3'>
        <Label size={'md'} className='p-0'>
          {productName}
        </Label>
        <Label size={'sm'} className='px-0 py-2'>
          {description}
        </Label>
      </CardContent>
    </Card>
  )
}
