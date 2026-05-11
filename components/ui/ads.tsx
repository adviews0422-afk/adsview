'use client'

import { useEffect } from 'react'

export default function Ads() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://gullible-thanks.com/bO3.VQ0IPl3Gp/vUbmm/VQJAZvD_0l3tMSDZM/1WNqTeAexXLsTEcGwYM/zjUB1WMaDHUz'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return null
}
