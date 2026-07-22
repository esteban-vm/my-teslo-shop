import type { ProductResult } from '@/schemas/product'
import Link from 'next/link'
import { ItemImage } from '@/components/shared'
import { formatProductPrice } from '@/lib/helpers'

export function ProductRow({ product }: { product: ProductResult }) {
  const { images, title, price, gender, stock, sizes, slug } = product

  return (
    <tr>
      <td>
        <Link href={`/product/${slug}`}>
          <ItemImage className='size-16' image={images[0]} title={title} />
        </Link>
      </td>
      <td className='w-full text-left font-semibold'>{title}</td>
      <td>{formatProductPrice(price)}</td>
      <td className='uppercase'>{gender}</td>
      <td>{stock}</td>
      <td>{sizes.join(', ')}</td>
    </tr>
  )
}
