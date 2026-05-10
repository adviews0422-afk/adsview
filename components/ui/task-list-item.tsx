import { Card, CardContent } from '@/components/ui/card'
import { TaskItemCard } from '@/types/type'
import { Label } from './label'
import { Button } from './button'

export default function TaskListItem({ category, href }: TaskItemCard) {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank')
    }
  }

  return (
    <Card className='bg-white flex flex-col w-ful rounded-lg hover:shadow-lg border transition duration-300 p-0 m-0 h-full overflow-hidden'>
      <CardContent className='flex flex-col p-3 gap-2'>
        <Label size={'md'} className='p-0'>
          {category}
        </Label>
        <Button onClick={handleClick}>Start Survey</Button>
      </CardContent>
    </Card>
  )
}
