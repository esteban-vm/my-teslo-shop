import type { Order } from '@/types'
import { Banknote, BanknoteX } from 'lucide-react'
import NextLink from 'next/link'
import { Link } from 'rsc-daisyui'
import { cn } from '@/lib/ui'

export function OrderRow({ order }: { order: Order }) {
  const { id, isPaid, shippingAddress } = order

  return (
    <tr className='text-nowrap hover:bg-base-300' key={id}>
      <td className='font-semibold'>{id}</td>
      <td>
        {shippingAddress?.firstName} {shippingAddress?.lastName}
      </td>
      <td className={cn('[&_svg]:inline [&_svg]:fill-current/30', isPaid ? 'text-success' : 'text-error')}>
        {isPaid ? <Banknote /> : <BanknoteX />}&nbsp;
        {isPaid ? 'Pagada' : 'No pagada'}
      </td>
      <td>
        <NextLink href={`/orders/${id}`} passHref>
          <Link as='span' color='info' hover>
            Ver orden
          </Link>
        </NextLink>
      </td>
    </tr>
  )
}
