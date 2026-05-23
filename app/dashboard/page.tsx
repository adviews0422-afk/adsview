'use client'

import { UserIcon } from 'lucide-react'
import { FaMoneyBill } from 'react-icons/fa'
import { SyncLoader } from 'react-spinners'

import { useGetDashboardUsersQuery } from '@/store/action/dashboardAction'
import { Label } from '@/components/ui/label'
import { TransactionProps } from '@/types/type'

function Dashboard() {
  const { data, isLoading } = useGetDashboardUsersQuery({})

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
  }

  if (isLoading) {
    return (
      <div className='w-full min-h-[70vh] flex justify-center items-center'>
        <SyncLoader color='#3b82f6' size={12} />
      </div>
    )
  }

  return (
    <div className='w-full space-y-6 p-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='flex flex-row group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'>
          <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-80' />
          <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30' />

          <UserIcon size={50} className=' p-3 text-primary' />

          <div className='flex flex-col'>
            <p className='text-sm text-gray-600'>Daily Active Users</p>
            <p className='text-3xl text-gray-700'>{data?.dau}</p>
            <p className='text-xs text-gray-500'>from last day</p>
          </div>
        </div>

        <div className='flex flex-row group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'>
          <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-80' />
          <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30' />

          <UserIcon size={50} className='p-3 text-primary' />
          <div className='flex flex-col'>
            <Label size={'md'}>Monthly Active Users</Label>
            <Label size={'xl'}>{data?.mau}</Label>
            <Label size={'xs'}>from last month</Label>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-3'>
          <Label size='xl'>Recent Transactions</Label>

          <div className='flex flex-col gap-3'>
            {data?.recentTransactions?.length === 0 ? (
              <div className='border rounded-md p-6 bg-white text-center text-gray-500'>
                No recent transactions found
              </div>
            ) : (
              data?.recentTransactions?.map((item: TransactionProps, index: number) => (
                <div
                  key={index}
                  className='flex flex-row justify-between group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
                >
                  <div className='flex flex-col'>
                    <Label size='sm'>{item.userId?.name || 'Unknown'}</Label>

                    <Label size='xs' className='text-gray-500'>
                      {item.userId?.email}
                    </Label>
                  </div>

                  <div className='text-right'>
                    <Label size='sm'>+{item.amount}</Label>
                    <Label size='sm'> coins</Label>

                    <div className='text-xs text-gray-500'>{formatDate(item.createdAt)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='space-y-3'>
          <Label size='xl'>Recent Withdrawals</Label>

          <div className='flex flex-col gap-3'>
            {data?.recentWithdrawals?.length === 0 ? (
              <div className='border rounded-md p-6 bg-white text-center text-gray-500'>
                No recent withdrawals found
              </div>
            ) : (
              data?.recentWithdrawals?.map((item: any, index: number) => (
                <div
                  key={index}
                  className='flex flex-row justify-between group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
                >
                  <div className='flex flex-col'>
                    <Label size='sm'>{item.userId?.name || 'Unknown'}</Label>

                    <Label size='xs' className='text-gray-500'>
                      {item.userId?.email}
                    </Label>
                  </div>

                  <div className='text-right'>
                    <Label size='sm'>-{item.amount}</Label>
                    <Label size='sm'> PHP</Label>

                    <div className='text-xs text-gray-500'>{formatDate(item.createdAt)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
