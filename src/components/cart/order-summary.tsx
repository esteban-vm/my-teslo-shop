'use client'

import Link from 'next/link'
import { Button, Card, Skeleton } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { useShallow } from 'zustand/shallow'
import { useMounted, useShoppingCart } from '@/hooks'
import { formatProductPrice } from '@/lib/helpers'

export function OrderSummary() {
  const { mounted } = useMounted(4)
  const info = useShoppingCart(useShallow((s) => s.getSummaryInformation()))

  if (!mounted) {
    return <Skeleton text>Cargando resumen de orden</Skeleton>
  }

  const { total, subtotal, tax, totalItems } = info

  return (
    <Container $as={Card}>
      <Card.Body className='px-4 pt-2 pb-3'>
        <Card.Title>Resumen de orden</Card.Title>
        <div>
          <p>
            Nro. de artículos:
            <span className='float-end'>{totalItems}</span>
          </p>
          <p>
            Subtotal:<span className='float-end'>{formatProductPrice(subtotal)}</span>
          </p>
          <p>
            Impuestos (15%):<span className='float-end'>{formatProductPrice(tax)}</span>
          </p>
          <p className='mt-1 font-semibold text-base'>
            Total:<span className='float-end'>{formatProductPrice(total)}</span>
          </p>
        </div>
        <Button as={Link} className='mx-auto' href='/checkout/address' size='sm' wide>
          Comprar ahora
        </Button>
      </Card.Body>
    </Container>
  )
}

const Container = tw.div`mx-auto not-lg:max-w-md border border-primary/25 p-2 shadow-md lg:w-full`
