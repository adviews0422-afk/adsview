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
  },

  {
    title: 'Tasks',
    icon: TableProperties,
    path: '/account/tasks',
  },

  {
    title: 'Referral',
    icon: Share,
    path: '/account/referral',
  },
  {
    title: 'Profile Settings',
    icon: User,
    path: '/account/profile',
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
  {
    title: 'CPX Research',
    description: 'cpx',
    image: '/provider-icons/cpx.svg',
    route: '/account/tasksList/cpx',
  },
  {
    title: 'ADGem',
    description: 'adgem',
    image: '/provider-icons/adgem.png',
    route: '/account/tasksList/adgem',
  },
  {
    title: 'Hilltops',
    description: 'Hilltop',
    image: '/provider-icons/adgem.png',
    route:
      'https://gullible-thanks.com/bO3.VQ0IPl3Gp/vUbmm/VQJAZvD_0l3tMSDZM/1WNqTeAexXLsTEcGwYM/zjUB1WMaDHUz',
  },

  // {
  //   title: 'AdscendMedia',
  //   description: 'cpx',
  //   image: '/provider-icons/adscendMedia.svg',
  // },
]
