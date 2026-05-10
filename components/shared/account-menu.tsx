import { ACCOUNT_MENU } from '@/utils/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Label } from '../ui/label'
import { signOut, useSession } from 'next-auth/react'
import { FaSignOutAlt } from 'react-icons/fa'
const AccountMenu = () => {
  const pathname = usePathname()

  return (
    <div className='py-3 w-full flex flex-col'>
      {ACCOUNT_MENU.map((menu, index) => {
        const Icon = menu.icon
        return (
          <Link
            className={`flex flex-row px-5 py-4 cursor-pointer hover:bg-slate-100 w-full items-center ${
              pathname === menu.path ? 'bg-slate-100' : ''
            }`}
            key={index}
            href={menu.path}
          >
            <Icon
              className={`min-h-6 min-w-6 mr-2  ${
                pathname === menu.path ? 'text-primary' : 'text-gray-500'
              }`}
            />
            <Label size={'md'}>{menu.title}</Label>
          </Link>
        )
      })}
      <Label
        className={`flex flex-row px-5 py-3 cursor-pointer hover:bg-slate-100 w-full items-center`}
        onClick={() => signOut()}
      >
        <FaSignOutAlt className={`h-6 w-6 mr-2 text-gray-500`} />
        <Label size={'md'}>Sign Out</Label>
      </Label>
    </div>
  )
}
export default AccountMenu
