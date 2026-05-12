'use client'

import React from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { SyncLoader } from 'react-spinners'
import { useSession } from 'next-auth/react'

import { useGetUserProfileQuery, useRequestWithdrawalMutation } from '@/store/action/accountAction'
import { useGetTransactionQuery } from '@/store/action/transactionAction'

import { TransactionProps } from '@/types/type'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { useToggle } from '@/hooks/useToggle'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import StatsCard from '@/components/ui/stats-card'

function Dashboard() {
  const { data } = useSession()

  const [value, toggle, setValue] = useToggle()

  const { data: profileData, refetch, isLoading: isProfileLoading } = useGetUserProfileQuery({})

  const { data: transactionData, isLoading: isTransactionLoading } = useGetTransactionQuery({})

  const [requestWithdrawal, { isLoading: isRequestingWithdrawal }] = useRequestWithdrawalMutation(
    {},
  )

  const isLoading = isProfileLoading || isTransactionLoading

  if (isLoading) {
    return (
      <div className='w-full min-h-[70vh] flex justify-center items-center'>
        <SyncLoader color='#3b82f6' size={12} />
      </div>
    )
  }

  return (
    <div className='flex w-full h-full p-4 flex-col gap-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        <StatsCard
          icon={<Image src='/coin.png' width={40} height={40} alt='' />}
          title='Balance'
          value={profileData?.data?.wallet?.balance}
          onPayout={() => {
            toggle()
          }}
        />

        <StatsCard
          icon={<Image src='/coin.png' width={40} height={40} alt='' />}
          title='Total Earned'
          value={profileData?.data?.wallet?.totalEarned}
        />

        <StatsCard
          icon={<Image src='/coin.png' width={40} height={40} alt='' />}
          title='Withdrawn'
          value={profileData?.data?.wallet?.totalWithdrawn}
        />
      </div>

      <Label size='lg'>Recent Transaction</Label>

      <div className='flex flex-col gap-3'>
        {transactionData?.data?.length === 0 ? (
          <div className='border rounded-md p-6 bg-white text-center text-gray-500'>
            No transactions found
          </div>
        ) : (
          transactionData?.data?.map((items: TransactionProps, index: number) => (
            <div
              className='flex items-center justify-between p-4 rounded-md w-full border bg-white hover:bg-gray-50 transition-colors'
              key={index}
            >
              <div className='flex flex-col gap-2'>
                <Label size='sm'>{items.userId.name}</Label>

                <Label size='xs'>{items.userId.email}</Label>

                <span
                  className={`text-xs rounded-full font-medium
                  ${
                    items.type === 'referral'
                      ? 'text-purple-700'
                      : items.type === 'task'
                        ? 'text-green-700'
                        : items.type === 'offer'
                          ? 'text-blue-700'
                          : 'text-red-700'
                  }`}
                >
                  {items.type}
                </span>
              </div>

              <div>
                <div className='text-right'>
                  <Label size='sm'>+{items.amount}</Label>
                  <Label size='sm'> coins</Label>
                </div>

                <Label size='xs'>{new Date(items.createdAt).toLocaleString()}</Label>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={value} onOpenChange={setValue}>
        <DialogContent className='w-md max-h-[90vh] overflow-y-auto'>
          <h2 className='text-xl font-bold text-gray-800'>Coin Conversion</h2>

          <p className='text-sm text-gray-500 mt-1'>Convert your earned coins to cash via PayPal</p>

          <div className='mt-6 bg-gray-50 rounded-xl p-4 border'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>
                {Math.floor(profileData?.data?.wallet?.balance / 5000)} x 5000 Coins
              </span>

              <span className='font-semibold text-gray-800'>
                ₱{Math.floor(profileData?.data?.wallet?.balance / 100000) * 7}
              </span>
            </div>

            <div className='mt-2 text-xs text-gray-500'>Exchange rate: 100,000 coins = ₱7 PHP</div>
          </div>

          <div className='mt-5'>
            <label className='text-sm font-medium text-gray-700'>PayPal Email</label>

            <input
              type='email'
              disabled
              value={data?.user.email}
              placeholder='you@example.com'
              className='mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='mt-3 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs p-3 rounded-lg'>
            ⚠️ Important: Your PayPal email must match your AdsView account email for successful
            payout verification.
          </div>

          <Button
            disabled={isRequestingWithdrawal}
            onClick={async () => {
              const response = await requestWithdrawal({}).unwrap()

              if (response?.status === 200) {
                toggle()
                await refetch()
                toast.success('Successfully transferred!')
              }
            }}
          >
            {isRequestingWithdrawal ? 'Transferring...' : 'Transfer to Paypal'}
          </Button>

          <p className='text-xs text-gray-400 text-center mt-4'>
            Processing may take 1–3 business days
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Dashboard
