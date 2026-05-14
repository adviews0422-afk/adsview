import {
  List,
  ShoppingCart,
  Home,
  User,
  TableProperties,
  Lightbulb,
  Car,
  Share,
  LayoutDashboard,
  Coins,
} from 'lucide-react'

export const ACCOUNT_MENU = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/account/dashboard',
    color: '#4c64bb',
  },

  {
    title: 'Tasks',
    icon: TableProperties,
    path: '/account/tasks',
    color: '#307557',
  },

  {
    title: 'Referral',
    icon: Share,
    path: '/account/referral',
    color: '#712d74',
  },
  {
    title: 'Profile Settings',
    icon: User,
    path: '/account/profile',
    color: '#817227',
  },
]

export const DASHBOARD_MENU = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    color: '#4c64bb',
  },

  {
    title: 'Transactions',
    icon: TableProperties,
    path: '/dashboard/transactions',
    color: '#307557',
  },

  {
    title: 'Withdrawals',
    icon: Share,
    path: '/dashboard/withdrawals',
    color: '#712d74',
  },
  {
    title: 'Profile Settings',
    icon: User,
    path: '/dashboard/profile',
    color: '#817227',
  },
]

export const HOW_IT_WORKS = [
  {
    icon: List,
    title: 'Easy Tasks',
    description: 'Complete surveys, offers, app installs, and more',
  },
  {
    icon: Coins,
    title: 'Earn Coins Instantly',
    description: 'Get rewarded right after task completion',
  },
  {
    icon: Lightbulb,
    title: 'Daily Opportunities',
    description: 'New tasks added every day',
  },
]

export const GAMES = [
  {
    id: '1',
    title: 'Baby Daycare Game',
    image: '/games/Baby Daycare Game-512x512.jpg',
    iframe: 'https://html5.gamemonetize.co/4v7y7okmokcjcr3xvu2tvg7mn6m714nk/',
  },
  {
    id: '2',
    title: 'Spider Escape Link',
    image: '/games/Spider Escape Link-512x512 (1).jpg',
    iframe: 'https://html5.gamemonetize.co/nqnluzp0t0plultzp9kz7r3r5p3udfmr/',
  },
  {
    id: '3',
    title: 'Merge Rainbow Fighting',
    image: '/games/Merge Rainbow Fighting -512x512.jpg',
    iframe: 'https://html5.gamemonetize.co/u65xrx2dtfsyfm4h7fozwp1f9eqiq0wk/',
  },
  {
    id: '4',
    title: 'Cake Protector',
    image: '/games/Cake Protector-512x512.jpg',
    iframe: 'https://html5.gamemonetize.co/8zigldmipiggmre844ek07d6gvqm6eia/',
  },
  {
    id: '5',
    title: 'Word Ladder',
    image: '/games/Word Ladder-512x512.jpg',
    iframe: 'https://html5.gamemonetize.co/1n7aeyhbtz2ygqvh8lkh2mu9ovbxb13a/',
  },
  {
    id: '6',
    title: 'Stickman Sniper',
    image: '/games/Stickman Sniper Shoot-512x512.jpg',
    iframe: 'https://html5.gamemonetize.co/bymes51dz58zqon1ooz7db2ubsxyrz7g/',
  },
  {
    id: '7',
    title: 'Cut My Candy',
    image: '/games/Cut My Candy-512x512.jpg',
    iframe: 'https://html5.gamemonetize.co/d2ajkz9qsul5ai8ly663jzm9n3a9k1jw/',
  },
  {
    id: '8',
    title: 'Ocean Blast',
    image: '/games/Ocean Blast  Block Puzzle-512x512.jpg',
    iframe: 'https://html5.gamemonetize.co/0km1ipa9tv0ihpdjs6c9gokwzlwxl7s2/',
  },
  {
    id: '9',
    title: 'Gun Man',
    image: '/games/Gunman-512x512.jpg',
    iframe: 'https://html5.gamemonetize.co/fk7e6zny5stirjlyeq27r7xpi50i79yo/',
  },
]
