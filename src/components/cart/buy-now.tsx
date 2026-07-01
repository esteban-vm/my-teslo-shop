'use client'

import Link from 'next/link'
import { Button, Card, Skeleton } from 'rsc-daisyui'
import { useMounted } from '@/hooks'
import { OrderSummary } from '../shared'

export function BuyNow() {
  const { mounted } = useMounted(4)

  if (!mounted) {
    return <Skeleton text>Cargando resumen de orden</Skeleton>
  }

  return (
    <Card>
      <Card.Body className='px-4 pt-2 pb-3'>
        <OrderSummary />
        <Button as={Link} className='mx-auto' href='/checkout/address' size='sm' wide>
          Comprar ahora
        </Button>
      </Card.Body>
    </Card>
  )
}
