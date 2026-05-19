import type { Gender } from '@/generated/prisma/client'
import { notFound, redirect } from 'next/navigation'
import { ProductActions } from '@/actions'
import { PagePagination, PageTitle, ProductCard, ProductGrid } from '@/components/common'

export default async function GenderPage({ params, searchParams }: PageProps<'/gender/[gender]'>) {
  const { gender } = await params
  const genderEnum = gender as Gender

  const genderMap: Record<Gender, string> = {
    men: 'hombres',
    women: 'mujeres',
    kids: 'niños',
    unisex: 'todos',
  }

  if (!genderMap[genderEnum]) notFound()

  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { products, totalPages } = await ProductActions.getProductsWithImages({
    page: Number.parseInt(page, 10),
    gender: genderEnum,
  })

  if (products.length === 0) redirect(`/gender/${gender}`)

  return (
    <>
      <PageTitle title={`Artículos para ${genderMap[genderEnum]}`} />
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductGrid>
      <PagePagination totalPages={totalPages} />
    </>
  )
}
