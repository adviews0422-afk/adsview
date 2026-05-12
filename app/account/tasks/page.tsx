'use client'

import React from 'react'
import { SyncLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'

import ProductCard from '@/components/ui/product-card'
import TaskCard from '@/components/ui/task-card'

import { PROVIDERS } from '@/utils/data'

import {
  useGetCurrentTaskQuery,
  useHilltopTaskMutation,
  useTaskCompletedMutation,
} from '@/store/action/taskAction'

function Profile() {
  const router = useRouter()

  const [taskCompleted, { isLoading }] = useTaskCompletedMutation({})

  const { data: currentTask, isLoading: isGettingCurrentTask } = useGetCurrentTaskQuery({})

  const [hilltopTask, { isLoading: isLoadingHilltopTask }] = useHilltopTaskMutation()

  const loading = isGettingCurrentTask || isLoading || isLoadingHilltopTask

  if (loading) {
    return (
      <div className='w-full min-h-[70vh] flex justify-center items-center'>
        <SyncLoader color='#3b82f6' size={12} />
      </div>
    )
  }

  return (
    <div className='flex w-full h-full p-4 flex-col gap-4'>
      {currentTask?.data && (
        <TaskCard
          isClaimed={currentTask?.data?.isClaimed}
          completed={currentTask?.data?.count}
          isLoading={isLoading}
          onClaim={async () => await taskCompleted({})}
        />
      )}

      <div className='grid grid-cols-12 gap-4'>
        {PROVIDERS.map((items, index) => (
          <div className='col-span-12 md:col-span-4' key={index}>
            <ProductCard
              productName={items.title}
              image={items.image}
              onClick={async () => {
                if (items.title === 'Hilltops') {
                  window.open(items.route)

                  await hilltopTask({})
                } else {
                  router.push(items.route)
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
