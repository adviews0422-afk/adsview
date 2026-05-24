'use client'

import { useEffect, useRef, useState } from 'react'
import { GAMES } from '@/utils/data'
import { useParams } from 'next/navigation'
import { useCreditTaskCountMutation } from '@/store/action/taskAction'
import { Fullscreen } from 'lucide-react'

export default function GamePage() {
  const params = useParams()
  const id = params.id as string

  const iframeContainerRef = useRef<HTMLDivElement>(null)

  const [creditTask, { isLoading: isLoadingHilltopTask }] = useCreditTaskCountMutation()

  const game = GAMES?.find((items) => items?.id === id)

  const [timeLeft, setTimeLeft] = useState(1 * 60)

  const onTimerFinish = async () => {
    await creditTask({})
  }

  const handleFullscreen = async () => {
    if (!iframeContainerRef.current) return

    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await iframeContainerRef.current.requestFullscreen()
    }
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
    <div ref={iframeContainerRef} className='relative h-[89vh] w-full bg-black'>
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 20,
          fontSize: '24px',
          background: '#000000',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: 8,
        }}
      >
        {timeLeft > 0 ? `⏱ ${minutes}:${seconds.toString().padStart(2, '0')}` : 'Claimed'}
      </div>

      {/* Fullscreen Button */}
      <button
        onClick={handleFullscreen}
        className='absolute right-3 top-3 z-20 rounded-lg bg-black/80 px-4 py-2 text-sm text-white transition hover:bg-black'
      >
        <Fullscreen />
      </button>

      {/* Game iframe */}
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
