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
        <div className='flex items-center gap-4 rounded border bg-white p-5 shadow-lg'>
          <UserIcon size={50} className='bg-slate-100 p-3 text-primary' />

          <div>
            <p className='text-sm text-gray-600'>Daily Active Users</p>
            <p className='text-3xl text-gray-700'>{data?.dau}</p>
            <p className='text-xs text-gray-500'>from last day</p>
          </div>
        </div>

        <div className='flex items-center gap-4 rounded border bg-white p-5 shadow-lg'>
          <UserIcon size={50} className='bg-slate-100 p-3 text-primary' />

          <div>
            <p className='text-sm text-gray-600'>Monthly Active Users</p>
            <p className='text-3xl text-gray-700'>{data?.mau}</p>
            <p className='text-xs text-gray-500'>from last month</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-3'>
          <Label size='lg'>Recent Transactions</Label>

          <div className='flex flex-col gap-3'>
            {data?.recentTransactions?.length === 0 ? (
              <div className='border rounded-md p-6 bg-white text-center text-gray-500'>
                No recent transactions found
              </div>
            ) : (
              data?.recentTransactions?.map((item: TransactionProps, index: number) => (
                <div
                  key={index}
                  className='flex justify-between items-center border rounded-md p-4 bg-white hover:bg-gray-50 transition-colors'
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
          <Label size='lg'>Recent Withdrawals</Label>

          <div className='flex flex-col gap-3'>
            {data?.recentWithdrawals?.length === 0 ? (
              <div className='border rounded-md p-6 bg-white text-center text-gray-500'>
                No recent withdrawals found
              </div>
            ) : (
              data?.recentWithdrawals?.map((item: any, index: number) => (
                <div
                  key={index}
                  className='flex justify-between items-center border rounded-md p-4 bg-white hover:bg-gray-50 transition-colors'
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
