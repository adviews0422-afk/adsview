'use client'

import AccountMenu from '@/components/shared/account-menu'

function Account() {
  return (
    <div className='flex  w-full h-full md:justify-center md:items-center '>
      <div className='md:hidden flex w-full'>
        <AccountMenu />
      </div>
      <p className='hidden md:flex text-gray-400'>Nothing to show</p>
    </div>
  )
}

export default Account
