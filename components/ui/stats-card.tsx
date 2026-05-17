import { Button } from './button'
import { Label } from './label'

type StatsCardProps = {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  onPayout?: () => void
  valueToPayout?: number
  isLoading?: boolean
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  valueToPayout,
  onPayout,
}: StatsCardProps) {
  return (
    <div className='w-full p-4 rounded-lg border flex items-center gap-3 shadow-lg'>
      {icon && <div className='p-2 rounded-md'>{icon}</div>}
      <div className='flex flex-col'>
        <Label size='sm'>{title}</Label>
        <Label size='lg'>{value}</Label>
        {subtitle && <Label size='xs'>{subtitle}</Label>}
        {onPayout && (
          <Button
            variant={'default'}
            onClick={onPayout}
            className='mt-2'
            disabled={+value < valueToPayout}
          >
            Payout
          </Button>
        )}
      </div>
    </div>
  )
}
