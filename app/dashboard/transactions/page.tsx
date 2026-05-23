'use client'

import { useEffect, useState } from 'react'
import { SyncLoader } from 'react-spinners'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function TransactionsPage() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const limit = 20

  const fetchData = async () => {
    setLoading(true)

    try {
      const res = await fetch(
        `/api/admin/get-all-transactions?page=${page}&limit=${limit}&search=${search}`,
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

  return (
    <div className='p-4 space-y-6 w-full'>
      <Label size={'xl'}>Transactions</Label>

      {/* Search */}
      <Input
        placeholder='Search name or email...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Spinner */}
      {loading && (
        <div className='flex justify-center py-6'>
          <SyncLoader color='#3b82f6' size={10} />
        </div>
      )}

      {/* Table */}
      {!loading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Label size={'md'}>User</Label>
              </TableHead>
              <TableHead>
                <Label size={'md'}>Type</Label>
              </TableHead>

              <TableHead>
                <Label size={'md'}>Amount</Label>
              </TableHead>
              <TableHead>
                <Label size={'md'}>Description</Label>
              </TableHead>
              <TableHead>
                <Label size={'md'}>Date</Label>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='text-center py-10 text-gray-500'>
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              data.map((t) => (
                <TableRow key={t._id}>
                  <TableCell className='flex flex-col'>
                    <Label size={'xs'}>{t.userId?.name || 'Unknown'}</Label>
                    <Label size={'xs'}>{t.userId?.email}</Label>
                  </TableCell>

                  <TableCell>
                    <Label size={'xs'}>{t.type}</Label>
                  </TableCell>

                  <TableCell className='font-semibold'>
                    <Label size={'xs'}>+{t.amount} Coins</Label>
                  </TableCell>

                  <TableCell>
                    <Label size={'xs'}>{t.description || '-'}</Label>
                  </TableCell>

                  <TableCell className='text-gray-500'>
                    <Label size={'xs'}>{new Date(t.createdAt).toLocaleString()}</Label>
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
