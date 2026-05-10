import type { Metadata } from 'next'

import AccountLayout from '@/components/shared/account-layout'

export const metadata: Metadata = {
  title: 'AdsView | Earn Coins by Completing Simple Tasks',
  description:
    'CDiscover stores near you and enjoy hassle-free delivery to your doorstep. Shop locally and get your items delivered quickly and easily.',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AccountLayout toggle={true}>{children}</AccountLayout>
}
