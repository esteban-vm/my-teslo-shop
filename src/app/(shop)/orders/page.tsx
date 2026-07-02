export const revalidate = 0

import type { Metadata } from 'next'
import { Banknote, BanknoteX } from 'lucide-react'
import NextLink from 'next/link'
import { Link, Table } from 'rsc-daisyui'
import { getOrders } from '@/actions/order'
import { PageTitle } from '@/components/pages'
import { cn } from '@/lib/ui'

export const metadata: Metadata = {
  title: 'Mis órdenes',
}

export default async function OrdersPage() {
  const { data: orders = [] } = await getOrders()

  return (
    <>
      <PageTitle title='Mis órdenes' />
      <section className='mb-3 w-full overflow-x-auto'>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre completo</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
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
            })}
          </tbody>
        </Table>
      </section>
    </>
  )
}
