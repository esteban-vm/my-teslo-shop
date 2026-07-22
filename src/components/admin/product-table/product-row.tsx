import type { ProductResult } from '@/schemas/product'
import NextLink from 'next/link'
import { Link } from 'rsc-daisyui'
import { ItemImage } from '@/components/shared'
import { formatProductPrice } from '@/lib/helpers'

export function ProductRow({ product }: { product: ProductResult }) {
  const { images, title, price, gender, stock, sizes, slug } = product

  return (
    <tr>
      <td>
        <NextLink href={`/product/${slug}`}>
          <ItemImage className='size-16 border-2 border-info' image={images[0]} title={title} />
        </NextLink>
      </td>
      <td className='w-full text-left'>
        <NextLink href={`/admin/product/${slug}`} passHref>
          <Link as='span' className='font-semibold' color='info' hover>
            {title}
          </Link>
        </NextLink>
      </td>
      <td>{formatProductPrice(price)}</td>
      <td className='uppercase'>{gender}</td>
      <td>{stock}</td>
      <td>{sizes.join(', ')}</td>
    </tr>
  )
}
