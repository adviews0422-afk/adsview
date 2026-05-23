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
  valueToPayout = 0,
  onPayout,
}: StatsCardProps) {
  return (
    <div className='flex flex-row p-6 gap-4 items-center group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'>
      <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-80' />
      <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30' />

      {icon && <div className='p-2 rounded-md'>{icon}</div>}
      <div className='flex flex-col'>
        <Label size='sm'>{title}</Label>
        <Label size='lg'>{value}</Label>
        {subtitle && <Label size='xs'>{subtitle}</Label>}
        {onPayout && (
          <Button
            variant={'default'}
            onClick={onPayout}
            className='mt-2 z-[1]'
            disabled={+value < +valueToPayout}
          >
            Payout
          </Button>
        )}
      </div>
    </div>
  )
}
