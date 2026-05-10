import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role?: string
      provider?: string
      referralCode?: string
      referredBy?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role?: string
    provider?: string
    referralCode?: string
    referredBy?: string
  }
}
