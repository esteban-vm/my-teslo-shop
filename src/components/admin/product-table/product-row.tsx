import type { ProductResult } from '@/schemas/product'
import Link from 'next/link'
import { ItemImage } from '@/components/shared'

export function ProductRow({ product }: { product: ProductResult }) {
  const { images, title, price: _, gender: __, stock: ___, sizes: ____, slug } = product

  return (
    <tr>
      <td>
        <Link href={`/product/${slug}`}>
          <ItemImage image={images[0]} title={title} />
        </Link>
      </td>
    </tr>
  )
}
