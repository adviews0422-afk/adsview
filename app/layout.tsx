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
        <Script
          async
          strategy='afterInteractive'
          custom-element='amp-auto-ads'
          src='https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js'
        />

        <StoreProvider>
          <AuthProvider>
            <Header />
            <div className='bg-gray-900'>{children}</div>
            <Footer />
          </AuthProvider>

          <Toaster position='top-center' />
        </StoreProvider>

        <amp-auto-ads type='adsense' data-ad-client='ca-pub-7785908484017299'></amp-auto-ads>
      </body>
    </html>
  )
}
