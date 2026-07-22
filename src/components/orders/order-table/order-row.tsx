import type { OrderResult } from '@/schemas/order'
import { Banknote, BanknoteX } from 'lucide-react'
import NextLink from 'next/link'
import { Link } from 'rsc-daisyui'
import { cn } from '@/lib/ui'

export function OrderRow({ order }: { order: OrderResult }) {
  const { id, isPaid, shippingAddress } = order

  return (
    <tr>
      <td className='max-w-30 truncate' title={id}>
        {id}
      </td>
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
