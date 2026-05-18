import { redirect } from 'next/navigation'
import tw from 'tailwind-styled-components'
import { ProductActions } from '@/actions'
import { Pagination, ProductCard } from '@/components/common'

export default async function ShopPage({ searchParams }: PageProps<'/'>) {
  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { products, totalPages } = await ProductActions.getProductsWithImages({ page: Number.parseInt(page, 10) })
  if (products.length === 0) redirect('/?page=1')

  return (
    <>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductGrid>
      <Pagination totalPages={totalPages} />
    </>
  )
}

const ProductGrid = tw.main`container mx-auto grid grid-cols-[repeat(auto-fit,minmax(--spacing(80),1fr))] gap-4 p-4`
