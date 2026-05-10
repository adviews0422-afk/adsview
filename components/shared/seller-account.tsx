'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useToggle } from '@/hooks/useToggle'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
const SellerAccount = () => {
  const { data: session } = useSession()
  const [value, toggle, setValue] = useToggle(false)
  useEffect(() => {
    if (!session) {
      toggle()
    } else {
      setValue(false)
    }
    // eslint-disable-next-line
  }, [session])
  return (
    <>
      {value && (
        <div className='w-100 bg-primary flex flex-row p-4 space-x-3 justify-center items-center'>
          <p className='text-white text-md'>Do you need seller account ?</p>
          <Link
            href={'/auth/merchant-registration'}
            className='bg-slate-100 hover:bg-slate-200 p-2 rounded text-sm'
          >
            Register
          </Link>
          <X className='h-6 w-6 text-white absolute right-10' onClick={() => toggle()} />
        </div>
      )}
    </>
  )
}

export default SellerAccount
