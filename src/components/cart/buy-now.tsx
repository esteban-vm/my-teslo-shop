'use client'

import Link from 'next/link'
import { Button, Card, Skeleton } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { useCartStore, useMounted } from '@/hooks'
import { SummaryDetails } from '../shared'

export function BuyNow() {
  const { mounted } = useMounted(4)
  const summary = useCartStore(useShallow((s) => s.getOrderSummary()))

  if (!mounted) {
    return <Skeleton text>Cargando resumen de orden</Skeleton>
  }

  return (
    <Card>
      <Card.Body>
        <SummaryDetails summary={summary} />
        <Button as={Link} href='/checkout/address' size='sm' wide>
          Comprar ahora
        </Button>
      </Card.Body>
    </Card>
  )
}
