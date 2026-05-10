'use client'
import RegisterForm from '@/components/forms/register-form'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface RegisterProps {
  searchParams: {
    callbackUrl: string
  }
}

export default function Register({ searchParams: { callbackUrl } }: RegisterProps) {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    if (session) router.push('/')
  })

  return (
    <div className='w-100 h-100 flex justify-center items-center flex-col'>
      <div className='min-w-[350px] max-w-[500px] border shadow-sm p-5 flex flex-col mt-5 mb-5'>
        <Label size={'xl'} className='px-0 my-3'>
          Create Account
        </Label>
        <RegisterForm callbackUrl={callbackUrl || '/'} />
      </div>
    </div>
  )
}
