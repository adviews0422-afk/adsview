'use client'

import React from 'react'
import { useGetUserProfileQuery } from '@/store/action/accountAction'
import ProductCard from '@/components/ui/product-card'
import { PROVIDERS } from '@/utils/data'
import TaskCard from '@/components/ui/task-card'
import StatsCard from '@/components/ui/stats-card'

import { useGetCurrentTaskQuery, useTaskCompletedMutation } from '@/store/action/taskAction'
import { useRouter } from 'next/navigation'
function Profile() {
  const router = useRouter()
  const [taskCompleted, { isLoading }] = useTaskCompletedMutation({})
  const { data: currentTask, isLoading: isGettingCurrentTask } = useGetCurrentTaskQuery({})
  return (
    <div className='flex w-full h-full p-4 flex-col gap-4'>
      {currentTask?.data && (
        <TaskCard
          completed={currentTask?.data?.count}
          isLoading={isLoading}
          onClaim={async () => await taskCompleted({})}
        />
      )}
      <div className='grid grid-cols-12 gap-4'>
        {PROVIDERS.map((items) => (
          <div className='col-span-12 md:col-span-4'>
            <ProductCard
              productName={items.title}
              image={items.image}
              onClick={() => router.push(items.route)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
