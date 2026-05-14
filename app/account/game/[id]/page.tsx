'use client'

import { useEffect, useState } from 'react'
import { GAMES } from '@/utils/data'
import { useParams } from 'next/navigation'
import { useCreditTaskCountMutation } from '@/store/action/taskAction'

export default function GamePage() {
  const params = useParams()
  const id = params.id as string
  const [hilltopTask, { isLoading: isLoadingHilltopTask }] = useCreditTaskCountMutation()
  const game = GAMES?.find((items) => items?.id === id)

  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes

  const onTimerFinish = async () => {
    await hilltopTask({})
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerFinish()
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  if (!game) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Game not found</h2>
      </div>
    )
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className='relative w-full h-[90vh]'>
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          zIndex: 10,
          background: '#00000060',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: 8,
        }}
      >
        {timeLeft > 0 ? `⏱ ${minutes}:${seconds.toString().padStart(2, '0')}` : 'Claimed'}
      </div>

      <iframe
        src={game.iframe}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allowFullScreen
      />
    </div>
  )
}
