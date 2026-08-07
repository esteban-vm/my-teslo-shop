import type { ProductsDB } from '@/schemas/product'
import { Table } from 'rsc-daisyui'
import { ProductRow } from './product-row'

export function ProductTable({ products }: { products: ProductsDB }) {
  return (
    <section className='data-table'>
      <Table className='text-center'>
        <thead>
          <tr>
            <th>Imagen</th>
            <th className='text-left'>Título</th>
            <th>Precio</th>
            <th>Género</th>
            <th>Inventario</th>
            <th>Tallas</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={crypto.randomUUID()} product={product} />
          ))}
        </tbody>
      </Table>
    </section>
  )
}
