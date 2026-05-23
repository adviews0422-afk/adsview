'use client'

import { useEffect, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import toast from 'react-hot-toast'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import WithdrawalSettingsForm from '@/components/forms/withdrawal-settings-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function WithdrawalsPage() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const limit = 20

  const fetchData = async () => {
    setLoading(true)

    try {
      const res = await fetch(
        `/api/admin/get-all-withdrawals?page=${page}&limit=${limit}&search=${search}`,
        { method: 'POST' },
      )

      const json = await res.json()

      setData(json.data)
      setPages(json.pages)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1)
      fetchData()
    }, 400)

    return () => clearTimeout(delay)
  }, [search])

  const handleMarkAsPaid = async (id: string) => {
    try {
      setActionLoading(id)

      const res = await fetch('/api/admin/mark-withdrawal-paid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          withdrawalId: id,
        }),
      })

      const json = await res.json()

      if (json.status === 200) {
        toast.success('Withdrawal marked as paid')
        fetchData()
      } else {
        toast.error(json.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setActionLoading(null)
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'rejected':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className='p-4 space-y-6 w-full'>
      <div className='group relative overflow-hidden rounded-md border border-primary/20 bg-[#070118] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'>
        <Label size={'xl'}>Conversion</Label>
        <WithdrawalSettingsForm />
      </div>

      <h1 className='text-2xl font-bold'>Withdrawals</h1>

      <Input
        placeholder='Search name or email...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <div className='flex justify-center py-6'>
          <SyncLoader color='#3b82f6' size={10} />
        </div>
      )}

      {!loading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Label size={'md'}>User</Label>
              </TableHead>
              <TableHead>
                <Label size={'md'}>Amount</Label>
              </TableHead>
              <TableHead>
                <Label size={'md'}>Method</Label>
              </TableHead>
              <TableHead>
                <Label size={'md'}>Status</Label>
              </TableHead>
              <TableHead>PayPal Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='text-center py-10 text-gray-500'>
                  No withdrawals found
                </TableCell>
              </TableRow>
            ) : (
              data.map((w) => (
                <TableRow key={w._id}>
                  <TableCell>
                    <div className='font-medium'>{w.userId?.name || 'Unknown'}</div>
                    <div className='text-xs text-gray-500'>{w.userId?.email}</div>
                  </TableCell>

                  <TableCell className='font-semibold'>₱{w.amount}</TableCell>

                  <TableCell>{w.method}</TableCell>

                  <TableCell className={statusColor(w.status)}>{w.status}</TableCell>

                  <TableCell>{w.paypalEmail}</TableCell>

                  <TableCell className='text-gray-500'>
                    {new Date(w.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {w.method === 'manual' && w.status === 'pending' ? (
                      <Button
                        variant={'outline'}
                        disabled={actionLoading === w._id}
                        onClick={() => handleMarkAsPaid(w._id)}
                      >
                        {actionLoading === w._id ? 'Processing...' : 'Mark as Paid'}
                      </Button>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {data?.length > 0 && (
        <div className='w-full flex justify-center items-center gap-4 pt-4'>
          <Button
            variant={'outline'}
            disabled={page === 1 || loading}
            onClick={() => setPage(page - 1)}
            className='border px-3 py-1 rounded disabled:opacity-50'
          >
            Prev
          </Button>

          <Label size={'sm'}>
            Page {page} / {pages}
          </Label>

          <Button
            variant={'outline'}
            disabled={page === pages || loading}
            onClick={() => setPage(page + 1)}
            className='border px-3 py-1 rounded disabled:opacity-50'
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
