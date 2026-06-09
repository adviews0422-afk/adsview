'use client'

import React, { useEffect, useState } from 'react'
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
import { useGetWithdrawalsQuery } from '@/store/action/withdrawal'
import { Input } from '@/components/ui/input'

function Dashboard() {
  const { data } = useSession()

  const [value, toggle, setValue] = useToggle()

  const [method, setMethod] = useState<'paypal' | 'gcash'>('paypal')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const { data: profileData, refetch, isLoading: isProfileLoading } = useGetUserProfileQuery({})
  const { data: transactionData, isLoading: isTransactionLoading } = useGetTransactionQuery({})
  const {
    data: withdrawalData,
    isLoading: isWithdrawalLoading,
    refetch: refetchWithdrawals,
  } = useGetWithdrawalsQuery({})

  const [requestWithdrawal, { isLoading: isRequestingWithdrawal }] = useRequestWithdrawalMutation(
    {},
  )

  useEffect(() => {
    refetch()
    refetchWithdrawals()
  }, [])

  useEffect(() => {
    if (data?.user?.email) {
      setEmail(data.user.email)
    }
  }, [data])

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return 'Email address is required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }

    return ''
  }

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      return 'Phone number is required'
    }
    const phoneRegex = /^(09|\+639)\d{9}$/
    if (!phoneRegex.test(value.trim())) {
      return 'Please enter a valid PH phone number'
    }
    return ''
  }

  const isLoading = isProfileLoading || isTransactionLoading || isWithdrawalLoading

  if (isLoading) {
    return (
      <div className='w-full min-h-[70vh] flex justify-center items-center'>
        <SyncLoader color='#3b82f6' size={12} />
      </div>
    )
  }

  return (
    <div className='flex w-full h-full md:p-4 flex-col gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        <StatsCard
          icon={<Image src='/coin.png' width={40} height={40} alt='' />}
          title='Balance'
          value={profileData?.data?.wallet?.balance}
          valueToPayout={profileData?.conversionRate?.coins}
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
      <div className='flex flex-col gap-4 w-full w-100 md:flex-row'>
        <div className='flex flex-col gap-3 w-full'>
          <Label size='xl'>Withdrawals</Label>

          {withdrawalData?.data?.length === 0 ? (
            <div className='border rounded-md p-6 bg-white text-center text-gray-500'>
              No withdrawals found
            </div>
          ) : (
            withdrawalData?.data?.map((item: any, index: number) => (
              <div
                key={index}
                className='flex flex-row p-6 gap-4 justify-between items-center group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-80' />
                <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30' />

                <div className='flex flex-col gap-1'>
                  <Label size='sm'>{item.email || item.paypalEmail}</Label>
                  <Label size='xs'>Phone: {item.phone || 'N/A'}</Label>
                  <Label size='xs'>Batch ID: {item.payoutBatchId}</Label>
                  <Label size='xs' className='text-gray-400 capitalize'>
                    Method: {item.method || 'paypal'}
                  </Label>

                  <span
                    className={`text-xs rounded-full font-medium mt-1
                    ${
                      item.status === 'paid'
                        ? 'text-green-700'
                        : item.status === 'pending'
                          ? 'text-yellow-700'
                          : item.status === 'approved'
                            ? 'text-blue-700'
                            : 'text-red-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className='text-right flex flex-col'>
                  <div>
                    <Label size='sm'>₱ {item.amount}</Label>
                  </div>

                  <Label size='xs'>{new Date(item.createdAt).toLocaleString()}</Label>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Transactions */}
        <div className='flex flex-col gap-3 w-full'>
          <Label size='xl'>Recent Transactions</Label>
          {transactionData?.data?.length === 0 ? (
            <div className='border rounded-md p-6 bg-white text-center text-gray-500'>
              No transactions found
            </div>
          ) : (
            transactionData?.data?.map((items: TransactionProps, index: number) => (
              <div
                key={index}
                className='flex flex-row p-6 gap-4 justify-between items-center group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-80' />
                <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30' />

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
                    <Label size='sm'>
                      {items.type === 'withdrawal' ? '-' : '+'}
                      {items.amount}
                    </Label>

                    <Label size='sm'> coins</Label>
                  </div>

                  <Label size='xs'>{new Date(items.createdAt).toLocaleString()}</Label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Withdrawal Dialog */}
      <Dialog open={value} onOpenChange={setValue}>
        <DialogContent className='w-md max-h-[90vh] overflow-y-auto bg-[#070118] shadow-lg border border-primary/20'>
          <Label size={'xl'}>Coin Conversion</Label>

          <Label size={'sm'}>Convert your earned coins to cash</Label>

          <div className='mt-6 bg-primary/20 rounded-xl p-4 border border-primary/20'>
            <div className='flex justify-between text-sm'>
              <Label size={'xs'}>
                {Math.floor(
                  profileData?.data?.wallet?.balance / profileData?.conversionRate?.coins,
                )}{' '}
                x {profileData?.conversionRate?.coins} Coins
              </Label>

              <Label size={'sm'}>
                ₱
                {Math.floor(
                  profileData?.data?.wallet?.balance / profileData?.conversionRate?.coins,
                ) * profileData?.conversionRate?.convertion}
              </Label>
            </div>

            <div className='mt-2 text-xs text-gray-500'>
              Exchange rate: {profileData?.conversionRate?.coins} coins = ₱
              {profileData?.conversionRate?.convertion} PHP
            </div>
          </div>

          {/* Withdrawal Method Selection */}
          <div className='mt-5 flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-300'>Select Withdrawal Method</label>
            <div className='grid grid-cols-2 gap-3'>
              <button
                type='button'
                onClick={() => {
                  setMethod('paypal')
                  setPhoneError('')
                  setEmailError('')
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  method === 'paypal'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-600'
                }`}
              >
                PayPal
              </button>
              <button
                type='button'
                onClick={() => {
                  setMethod('gcash')
                  setPhoneError('')
                  setEmailError('')
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  method === 'gcash'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-600'
                }`}
              >
                GCash
              </button>
            </div>
          </div>

          {/* Core Input Fields Shared Across Methods */}
          <div className='mt-4 flex flex-col gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-300'>
                {method === 'paypal' ? 'PayPal Email' : 'GCash Registered Email'}
              </label>
              <Input
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError('')
                }}
                placeholder='you@example.com'
                className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  emailError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {emailError && <p className='text-red-500 text-xs mt-1'>{emailError}</p>}
            </div>

            <div>
              <label className='text-sm font-medium text-gray-300'>
                {method === 'paypal' ? 'Contact Phone Number' : 'GCash Phone Number'}
              </label>
              <Input
                type='text'
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (phoneError) setPhoneError('')
                }}
                placeholder='09171234567'
                className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  phoneError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {phoneError && <p className='text-red-500 text-xs mt-1'>{phoneError}</p>}
            </div>
          </div>

          <div className='mt-3 bg-yellow-950/40 border border-yellow-700/50 text-yellow-500 text-xs p-3 rounded-lg flex flex-col gap-1'>
            <span>
              ⚠️ <strong>Important:</strong> Ensure your credentials are fully registered, verified,
              and correct. Incorrect details may cause permanent transaction loss.
            </span>
            <span className='mt-1 font-semibold text-yellow-400'>
              ℹ️ Note: Processing charges/service fees may apply depending on your selected option.
            </span>
          </div>

          <Button
            disabled={isRequestingWithdrawal}
            onClick={async () => {
              // Validate both email and phone across both method types
              const emailValidationError = validateEmail(email)
              if (emailValidationError) {
                setEmailError(emailValidationError)
                return
              }

              const phoneValidationError = validatePhone(phone)
              if (phoneValidationError) {
                setPhoneError(phoneValidationError)
                return
              }

              try {
                // Uniformly submits email, phone, and method to the backend
                const response = await requestWithdrawal({
                  email,
                  phone,
                  method,
                }).unwrap()

                if (response?.status === 200) {
                  toggle()
                  await refetch()
                  await refetchWithdrawals()
                  toast.success('Successfully requested withdrawal!')
                }
              } catch (error) {
                console.log(error)
                toast.error('Failed to process withdrawal')
              }
            }}
          >
            {isRequestingWithdrawal
              ? 'Transferring...'
              : `Transfer to ${method === 'paypal' ? 'PayPal' : 'GCash'}`}
          </Button>

          <p className='text-xs text-gray-400 text-center mt-4'>
            Processing may take 3–5 business days
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Dashboard
