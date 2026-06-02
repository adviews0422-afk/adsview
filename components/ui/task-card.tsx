import { Button } from './button'
import { Label } from './label'

type TaskCardProps = {
  data: any
  isLoading: boolean
  onClaim?: () => void
}

const TaskCard = ({ data, isLoading = false, onClaim }: TaskCardProps) => {
  return (
    <div className='group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'>
      <div className='w-full'>
        <div className='flex items-center justify-between mb-3'>
          <Label size={'md'}>{data?.title}</Label>
        </div>
        <div className='w-full h-3 bg-primary/20 rounded-full overflow-hidden mb-4'>
          <div
            className='h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500'
            style={{ width: `100%` }}
          />
        </div>
        <Label size={'sm'}>
          Task Completed! You can now claim your {data?.reward} coin reward 🎉
        </Label>
      </div>

      <Button onClick={onClaim} className='z-10' disabled={data?.isClaimed || isLoading}>
        {!isLoading ? 'Claim' : 'Claiming...'}
      </Button>
    </div>
  )
}
export default TaskCard
