'use client'

import React from 'react'
import { SyncLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'

import ProductCard from '@/components/ui/product-card'
import TaskCard from '@/components/ui/task-card'

import { GAMES, GAMES2 } from '@/utils/data'

import {
  useCreditTaskCountMutation,
  useGetCurrentTaskQuery,
  useTaskCompletedMutation,
} from '@/store/action/taskAction'
import { Label } from '@/components/ui/label'

function Profile() {
  const router = useRouter()

  const [taskCompleted, { isLoading }] = useTaskCompletedMutation({})

  const { data: currentTask, isLoading: isGettingCurrentTask, refetch } = useGetCurrentTaskQuery({})

  const loading = isGettingCurrentTask || isLoading

  if (loading) {
    return (
      <div className='w-full min-h-[70vh] flex justify-center items-center'>
        <SyncLoader color='#3b82f6' size={12} />
      </div>
    )
  }

  return (
    <div className='flex w-full h-full md:p-4 flex-col gap-4'>
      {currentTask?.data && (
        <TaskCard
          isClaimed={currentTask?.data?.isClaimed}
          completed={currentTask?.data?.count}
          isLoading={isLoading}
          onClaim={async () => {
            await taskCompleted({})
            await refetch()
          }}
        />
      )}

      <Label size={'lg'}>Play a game for 15 minutes to earn credit for 1 completed task.</Label>
      <div className='grid grid-cols-12 gap-4'>
        {GAMES.map((items: any, index: number) => (
          <div className='col-span-12 md:col-span-4' key={index}>
            <ProductCard
              productName={items.title}
              image={items.image}
              onClick={async () => {
                router.push(`/account/game/${items.id}`)
              }}
            />
          </div>
        ))}
      </div>
      <div className='grid grid-cols-12 gap-4'>
        {GAMES2.map((items: any, index: number) => (
          <div className='col-span-12 md:col-span-4' key={index}>
            <ProductCard
              productName={items.title}
              image={items.image}
              onClick={async () => {
                router.push(`/account/game/${items.id}`)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
