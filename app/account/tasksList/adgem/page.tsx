'use client'
import { useGetCpxResearchTaskQuery } from '@/store/action/taskAction'
import { useSession } from 'next-auth/react'
const CpxResearch = () => {
  const { data } = useSession()
  return (
    <div className='container w-full h-full'>
      <iframe
        src={`https://adunits.adgem.com/wall?appid=32556&playerid=${data?.user.id}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          zIndex: 999999,
        }}
      >
        Your browser doesn't support iframes
      </iframe>
    </div>
  )
}

export default CpxResearch
