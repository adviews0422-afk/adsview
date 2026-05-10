import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import connectDB from './db'
import User from './model/user.model'

export const nextauthOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        await connectDB()
        if (!credentials?.email || !credentials?.password) return null

        const user = await User.findOne({ email: credentials.email })

        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.password || '')

        if (!isValid) return null

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          provider: user.provider,
          referralCode: user.referralCode,
          referredBy: user.referredBy,
          wallet: user.wallet,
          socialShares: user.socialShares,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = (user as any).id
        token.name = user.name
        token.email = user.email
        token.role = (user as any).role
        token.provider = (user as any).provider
        token.referralCode = (user as any).referralCode
        token.referredBy = (user as any).referredBy
      }

      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
        session.user.provider = token.provider as string
        session.user.referralCode = token.referralCode as string
        session.user.referredBy = token.referredBy as string
      }

      return session
    },
  },
}
