import type { Gender } from '@/generated/prisma/client'
import { notFound, redirect } from 'next/navigation'
import { ProductActions } from '@/actions'
import { PagePagination, PageTitle } from '@/components/shared'
import { ProductCard, ProductGrid } from '@/components/shop'

export default async function GenderPage({ params, searchParams }: PageProps<'/gender/[gender]'>) {
  const { gender } = await params
  const genderDB = gender as Gender

  const genderMap: Record<Gender, string> = {
    men: 'hombres',
    women: 'mujeres',
    kids: 'niños',
    unisex: 'todos',
  }

  const selectedGender = genderMap[genderDB]
  if (!selectedGender) notFound()

  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { products, totalPages } = await ProductActions.getProductsWithImages({
    page: Number.parseInt(page, 10),
    gender: genderDB,
  })

  if (products.length === 0) redirect(`/gender/${genderDB}`)

  return (
    <>
      <PageTitle title={`Artículos para ${selectedGender}`} />
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductGrid>
      <PagePagination totalPages={totalPages} />
    </>
  )
}
