import type { ProductDB } from '@/schemas/product'
import NextLink from 'next/link'
import { Link } from 'rsc-daisyui'
import { ItemImage } from '@/components/shared'
import { formatPrice } from '@/lib/helpers'

export function ProductRow({ product }: { product: ProductDB }) {
  const { id, images, title, price, gender, stock, sizes, slug } = product

  return (
    <tr>
      <td>
        <NextLink href={`/product/${slug}`} title='Detalle de este producto'>
          <ItemImage className='size-16 border-2 border-info' image={images[0]} title={title} />
        </NextLink>
      </td>
      <td className='w-full text-left'>
        <NextLink href={`/admin/product/${id}`} passHref>
          <Link as='span' className='font-semibold' color='info' hover title='Editar este producto'>
            {title}
          </Link>
        </NextLink>
      </td>
      <td>{formatPrice(price)}</td>
      <td className='uppercase'>{gender}</td>
      <td>{stock}</td>
      <td>{sizes.join(', ')}</td>
    </tr>
  )
}
