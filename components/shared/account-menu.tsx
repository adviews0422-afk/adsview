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
            className={`flex flex-row px-5 py-4 cursor-pointer hover:bg-primary/10 w-full items-center rounded-md ${
              pathname === menu.path ? 'bg-primary/10' : ''
            }`}
            key={index}
            href={menu.path}
          >
            <Icon
              style={{ backgroundColor: menu.color }}
              className={`rounded-md h-8 w-8 mr-2 text-white p-2`}
            />
            <Label size={'md'}>{menu.title}</Label>
          </Link>
        )
      })}
      <Label
        className={`flex flex-row px-5 py-4 cursor-pointer hover:bg-primary/10 w-full items-center rounded-md`}
        onClick={() => signOut()}
      >
        <FaSignOutAlt
          style={{ backgroundColor: '#b34141' }}
          className={`rounded-md h-8 w-8 mr-2 text-white p-2`}
        />
        <Label size={'md'}>Sign Out</Label>
      </Label>
    </div>
  )
}
export default AccountMenu
