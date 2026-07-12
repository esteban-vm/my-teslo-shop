import type { Order } from '@/types'
import { Table } from 'rsc-daisyui'
import { OrderRow } from './order-row'

export function OrderTable({ orders }: { orders: Order[] }) {
  return (
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
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </Table>
    </section>
  )
}
