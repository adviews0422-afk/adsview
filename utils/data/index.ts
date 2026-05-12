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

export const PROVIDERS = [
  // {
  //   title: 'CPX Research',
  //   description: 'cpx',
  //   image: '/provider-icons/cpx.svg',
  //   route: '/account/tasksList/cpx',
  // },
  {
    title: 'ADGem',
    description: 'adgem',
    image: '/provider-icons/adgem.png',
    route: '/account/tasksList/adgem',
  },
  // {
  //   title: 'Hilltops',
  //   description: 'Hilltop',
  //   image: '/provider-icons/hilltops.jpg',
  //   route:
  //     'https://gullible-thanks.com/bO3.VQ0IPl3Gp/vUbmm/VQJAZvD_0l3tMSDZM/1WNqTeAexXLsTEcGwYM/zjUB1WMaDHUz',
  // },

  // {
  //   title: 'AdscendMedia',
  //   description: 'cpx',
  //   image: '/provider-icons/adscendMedia.svg',
  // },
]
