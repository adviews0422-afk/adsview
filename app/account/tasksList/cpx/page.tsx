'use client'
import TaskListItem from '@/components/ui/task-list-item'
import { Label } from '@/components/ui/label'

import { useGetCpxResearchTaskQuery } from '@/store/action/taskAction'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
const CpxResearch = () => {
  const searchParams = useSearchParams()
  const { data } = useSession()
  const { data: taskList, isLoading } = useGetCpxResearchTaskQuery({
    userId: data?.user.id,
  })
  return (
    <div className='flex container w-full h-full p-4 flex-col gap-4'>
      <Label size={'lg'}>Tasks</Label>
      <div className='grid grid-cols-3 gap-4'>
        {taskList?.data?.map((items: any) => (
          <div className='col-span-1'>
            <TaskListItem href={items?.href} category={items?.category} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CpxResearch
