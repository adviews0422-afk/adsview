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
    <div className='p-6 space-y-6 w-full'>
      <h1 className='text-2xl font-bold'>Transactions</h1>

      {/* Search */}
      <input
        className='border p-2 w-64 rounded'
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
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
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
                  <TableCell>
                    <div className='font-medium'>{t.userId?.name || 'Unknown'}</div>
                    <div className='text-xs text-gray-500'>{t.userId?.email}</div>
                  </TableCell>

                  <TableCell>{t.type}</TableCell>

                  <TableCell className='font-semibold'>₱{t.amount}</TableCell>

                  <TableCell>{t.description || '-'}</TableCell>

                  <TableCell className='text-gray-500'>
                    {new Date(t.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {data?.length > 0 && (
        <div className='w-full flex justify-center items-center gap-4 pt-4'>
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage(page - 1)}
            className='border px-3 py-1 rounded disabled:opacity-50'
          >
            Prev
          </button>

          <span className='text-sm text-gray-600'>
            Page {page} / {pages}
          </span>

          <button
            disabled={page === pages || loading}
            onClick={() => setPage(page + 1)}
            className='border px-3 py-1 rounded disabled:opacity-50'
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
