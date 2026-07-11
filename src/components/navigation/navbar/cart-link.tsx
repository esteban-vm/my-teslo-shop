'use client'

import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { Button, Indicator, Skeleton } from 'rsc-daisyui'
import { useCartStore, useMounted } from '@/hooks'

export function CartLink() {
  const { mounted } = useMounted(2)
  const totalItems = useCartStore((s) => s.getTotalItems())

  if (!mounted) {
    return <Skeleton className='h-7 w-8 rounded-box' />
  }

  return (
    <Indicator>
      <Indicator.Badge className='rounded-full!' ghost size='xs'>
        {totalItems}
      </Indicator.Badge>
      <Button as={Link} ghost href={totalItems === 0 ? '/cart/empty' : '/cart'} shape='square' size='sm'>
        <ShoppingCartIcon />
      </Button>
    </Indicator>
  )
}
