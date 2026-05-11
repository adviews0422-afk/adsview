'use client'

import React from 'react'
import { useGetUserProfileQuery, useRequestWithdrawalMutation } from '@/store/action/accountAction'
import ProductCard from '@/components/ui/product-card'
import { PROVIDERS } from '@/utils/data'
import TaskCard from '@/components/ui/task-card'
import StatsCard from '@/components/ui/stats-card'
import { useGetTransactionQuery } from '@/store/action/transactionAction'
import { TransactionProps } from '@/types/type'
import { Label } from '@/components/ui/label'
import { useToggle } from '@/hooks/useToggle'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
function Dashboard() {
  const { data } = useSession()
  const [value, toggle, setValue] = useToggle()
  const { data: profileData, refetch } = useGetUserProfileQuery({})
  const { data: transactionData } = useGetTransactionQuery({})
  const [requestWithdrawal, { isLoading: isRequestingWithdrawal }] = useRequestWithdrawalMutation(
    {},
  )
  return (
    <div className='flex w-full h-full p-4 flex-col gap-4'>
      <div className='flex flex-col md:flex-row gap-4 w-full'>
        {profileData?.data && (
          <>
            <StatsCard
              title={'Balance'}
              value={profileData?.data?.wallet?.balance}
              onPayout={() => {
                toggle()
              }}
            />
            <StatsCard title={'Total Earned'} value={profileData?.data?.wallet?.totalEarned} />
            <StatsCard title={'Withdrawn'} value={profileData?.data?.wallet?.totalWithdrawn} />
          </>
        )}
      </div>
      {transactionData?.data && <Label size={'lg'}>Recent Transaction</Label>}
      {transactionData?.data?.map((items: TransactionProps, index: number) => (
        <div className='flex items-center justify-between p-4 rounded-md w-full border' key={index}>
          <div className='flex flex-col gap-2'>
            <Label size={'sm'}>{items.userId.name}</Label>
            <Label size={'xs'}>{items.userId.email}</Label>
            <span
              className={`text-xs py-t rounded-full font-medium
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
              <Label size={'sm'}>+{items.amount}</Label>
              <Label size={'sm'}> coins</Label>
            </div>
            <Label size={'xs'}>{items.createdAt}</Label>
          </div>
        </div>
      ))}

      <Dialog open={value} onOpenChange={setValue}>
        <DialogContent className='w-md max-h-[90vh] overflow-y-auto'>
          <h2 className='text-xl font-bold text-gray-800'>Coin Conversion</h2>
          <p className='text-sm text-gray-500 mt-1'>Convert your earned coins to cash via PayPal</p>

          {/* Conversion Box */}
          <div className='mt-6 bg-gray-50 rounded-xl p-4 border'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>
                {Math.floor(profileData?.data?.wallet?.balance / 5000)} x 5000 Coins
              </span>
              <span className='font-semibold text-gray-800'>
                ₱{Math.floor(profileData?.data?.wallet?.balance / 5000) * 20.0}
              </span>
            </div>

            <div className='mt-2 text-xs text-gray-500'>Exchange rate: 5000 coins = ₱20 PHP</div>
          </div>

          {/* PayPal Email */}
          <div className='mt-5'>
            <label className='text-sm font-medium text-gray-700'>PayPal Email</label>
            <input
              type='email'
              disabled={true}
              value={data?.user.email}
              placeholder='you@example.com'
              className='mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Warning */}
          <div className='mt-3 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs p-3 rounded-lg'>
            ⚠️ Important: Your PayPal email must match your AdsView account email for successful
            payout verification.
          </div>

          {/* Button */}
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

          {/* Footer note */}
          <p className='text-xs text-gray-400 text-center mt-4'>
            Processing may take 1–3 business days
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Dashboard
