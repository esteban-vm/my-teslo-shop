'use client'

import Link from 'next/link'
import { Button, Card } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { useMounted, useShoppingCart } from '@/hooks'
import { formatProductPrice } from '@/lib/helpers'
import { SkeletonLoader } from '../shared'

export function OrderSummary() {
  const { mounted } = useMounted(4)
  const { total, subtotal, tax, totalItems } = useShoppingCart(useShallow((s) => s.getSummaryInformation()))

  if (!mounted) {
    return <SkeletonLoader text='Cargando resumen de orden' />
  }

  return (
    <Card border className='mx-auto shadow-md xl:w-[90%]'>
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
    </Card>
  )
}
