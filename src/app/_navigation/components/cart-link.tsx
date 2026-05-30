'use client'

import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, Indicator } from 'rsc-daisyui'
import { useShoppingCart } from '@/hooks'

export function CartLink() {
  const [mounted, setMounted] = useState(false)
  const totalItems = useShoppingCart((s) => s.getTotalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Indicator>
      <Indicator.Badge ghost size='xs'>
        {totalItems}
      </Indicator.Badge>
      <Button ghost shape='square' size='sm'>
        <ShoppingCart />
      </Button>
    </Indicator>
  )
}
