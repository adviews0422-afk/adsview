'use client'

import React, { useEffect, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'

import ProductCard from '@/components/ui/product-card'
import TaskCard from '@/components/ui/task-card'

import { GAMES, GAMES2 } from '@/utils/data'

import { useCompleteTaskMutation, useGetUnClaimedTaskQuery } from '@/store/action/taskAction'
import { Label } from '@/components/ui/label'

function Profile() {
  const router = useRouter()

  const [claimingId, setClaimingId] = useState<string | null>(null)

  const [completeTask] = useCompleteTaskMutation()

  const {
    data: unClaimedTask,
    isLoading: isGettingUnclaimedTask,
    refetch,
  } = useGetUnClaimedTaskQuery({})

  useEffect(() => {
    refetch()
  }, [])

  if (isGettingUnclaimedTask) {
    return (
      <div className='w-full min-h-[70vh] flex justify-center items-center'>
        <SyncLoader color='#3b82f6' size={12} />
      </div>
    )
  }

  return (
    <div className='flex w-full h-full md:p-4 flex-col gap-4'>
      {unClaimedTask?.data?.map((items: any) => (
        <TaskCard
          key={items._id}
          data={items}
          isLoading={claimingId === items._id}
          onClaim={async () => {
            try {
              setClaimingId(items._id)

              await completeTask(items._id).unwrap()
              await refetch()
            } finally {
              setClaimingId(null)
            }
          }}
        />
      ))}

      <Label size='lg'>Earn Coins by Playing Games</Label>
      <Label size={'xs'}>
        Play any game for at least 15 minutes to earn coins. Make sure the game remains active
        during the required playtime to qualify for rewards.
      </Label>
      <Label size={'xs'}>
        Important Notes: Do not close or refresh the game page while playing. Do not skip, block, or
        interfere with advertisements displayed during gameplay. Rewards may not be credited if ads
        are skipped or if gameplay is interrupted before the required duration. Coins will be
        awarded automatically once the playtime requirement has been successfully completed. Enjoy
        playing and start earning coins!
      </Label>

      <div className='grid grid-cols-12 gap-4'>
        {GAMES.map((items: any, index: number) => (
          <div className='col-span-12 md:col-span-4' key={index}>
            <ProductCard
              productName={items.title}
              image={items.image}
              onClick={() => {
                router.push(`/account/game/${items.id}/${items.title}`)
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
              onClick={() => {
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
