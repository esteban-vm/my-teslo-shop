import { redirect } from 'next/navigation'
import { ProductActions } from '@/actions'
import { PagePagination, PageTitle, ProductCard, ProductGrid } from '@/components/common'

export default async function ShopPage({ searchParams }: PageProps<'/'>) {
  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { products, totalPages } = await ProductActions.getProductsWithImages({ page: Number.parseInt(page, 10) })
  if (products.length === 0) redirect('/?page=1')

  return (
    <>
      <PageTitle subtitle='Todos los productos' title='Tienda' />
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductGrid>
      <PagePagination totalPages={totalPages} />
    </>
  )
}
