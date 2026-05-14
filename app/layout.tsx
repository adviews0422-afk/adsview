import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/providers/auth-provider'
import Header from '@/components/shared/header'
import { Toaster } from 'react-hot-toast'

import StoreProvider from '@/providers/store-provider'
import Footer from '@/components/shared/footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AdsView | Earn Coins by Completing Simple Tasks',
  description: 'Earn Coins by Completing Simple Tasks',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <Header />
            <div>{children}</div>
            <Footer />
          </AuthProvider>
          <Toaster position='top-center' />
        </StoreProvider>
      </body>
    </html>
  )
}
