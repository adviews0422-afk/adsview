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
    <div className='w-full p-5 bg-white shadow-lg rounded-lg border flex flex-col md:flex-row md:justify-center md:items-center gap-4'>
      <div className='w-full'>
        <div className='flex items-center justify-between mb-3'>
          <Label size={'md'}>Task</Label>
          <Label size={'sm'}>
            {completed}/{total}
          </Label>
        </div>
        <div className='w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4'>
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

      <Button onClick={onClaim} disabled={!isComplete || isLoading || isClaimed}>
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
