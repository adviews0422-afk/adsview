import { Button } from './button'
import { Label } from './label'

type TaskCardProps = {
  completed: number
  total?: number
  isClaimed: boolean
  isLoading: boolean
  onClaim?: () => void
}

const TaskCard = ({
  completed,
  total = 15,
  isClaimed,
  isLoading = false,
  onClaim,
}: TaskCardProps) => {
  const progress = Math.min((completed / total) * 100, 100)
  const isComplete = completed >= total

  return (
    <div className='group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'>
      <div className='w-full'>
        <div className='flex items-center justify-between mb-3'>
          <Label size={'md'}>Task</Label>
          <Label size={'sm'}>
            {completed}/{total}
          </Label>
        </div>
        <div className='w-full h-3 bg-primary/20 rounded-full overflow-hidden mb-4'>
          <div
            className='h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500'
            style={{ width: `${progress}%` }}
          />
        </div>{' '}
        <Label size={'sm'}>
          {isComplete
            ? !isClaimed
              ? 'Completed 15 task! You can now claim your reward 🎉'
              : 'Claimed'
            : `Complete ${total - completed} more task(s) to claim`}
        </Label>
      </div>

      <Button onClick={onClaim} className='z-10' disabled={completed !== total}>
        {isComplete
          ? !isLoading
            ? isClaimed
              ? 'Claimed'
              : 'Claim Reward'
            : 'Claiming...'
          : 'Locked'}
      </Button>
    </div>
  )
}
export default TaskCard
