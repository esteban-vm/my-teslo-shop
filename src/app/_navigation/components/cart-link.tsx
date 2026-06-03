'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button, Indicator, Skeleton } from 'rsc-daisyui'
import { useMounted, useShoppingCart } from '@/hooks'

export function CartLink() {
  const { mounted } = useMounted(2)
  const totalItems = useShoppingCart((s) => s.getTotalItems())

  if (!mounted) {
    return <Skeleton className='h-7 w-8 rounded-box' />
  }

  return (
    <Indicator>
      <Indicator.Badge className='rounded-full!' ghost size='xs'>
        {totalItems}
      </Indicator.Badge>
      <Button as={Link} ghost href='/cart' shape='square' size='sm'>
        <ShoppingCart />
      </Button>
    </Indicator>
  )
}
