export const revalidate = 60

import type { Metadata } from 'next'
import type { Gender } from '@/prisma/generated/client'
import { notFound, redirect } from 'next/navigation'
import { ProductActions } from '@/actions'
import { PagePagination, PageTitle } from '@/components/shared'
import { ProductGrid } from '@/components/shop'
import { genderMap } from '@/lib/constants'

type GenderPageProps = PageProps<'/gender/[gender]'>

export async function generateMetadata({ params }: GenderPageProps): Promise<Metadata> {
  const { gender } = await params
  const genderDB = gender as Gender
  const currentGender = genderMap[genderDB]

  if (!currentGender) {
    return {
      title: 'Género no encontrado',
    }
  }

  return {
    title: `Artículos para ${currentGender}`,
  }
}

export default async function GenderPage({ params, searchParams }: GenderPageProps) {
  const { gender } = await params
  const genderDB = gender as Gender

  const currentGender = genderMap[genderDB]
  if (!currentGender) notFound()

  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { products, totalPages } = await ProductActions.getProducts({
    page: Number.parseInt(page, 10),
    gender: genderDB,
  })

  if (products.length === 0) {
    redirect(`/gender/${genderDB}`)
  }

  return (
    <>
      <PageTitle title={`Artículos para ${currentGender}`} />
      <ProductGrid products={products} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
