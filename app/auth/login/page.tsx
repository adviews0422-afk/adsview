'use client'
import LoginForm from '@/components/forms/login-form'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface LoginProps {
  searchParams: {
    callbackUrl: string
  }
}

export default function Login({ searchParams: { callbackUrl } }: LoginProps) {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    if (session) router.push('/')
  })

  return (
    <div className='w-full min-h-100vh flex justify-center items-center'>
      <div className='min-w-[350px] max-w-[500px] border group relative overflow-hidden rounded-md border border-primary/20  bg-[#070118] p-5 flex flex-col mt-12 mb-12'>
        <Label size={'xl'} className='px-0 my-3'>
          Login
        </Label>
        <LoginForm callbackUrl={callbackUrl || '/'} />
      </div>
    </div>
  )
}
