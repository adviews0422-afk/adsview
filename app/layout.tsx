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
  description:
    'CDiscover stores near you and enjoy hassle-free delivery to your doorstep. Shop locally and get your items delivered quickly and easily.',
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
        <Script
          async
          strategy='afterInteractive'
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7785908484017299'
          crossOrigin='anonymous'
        />

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
