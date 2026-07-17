export const revalidate = 60

import type { Metadata } from 'next'
import type { Gender } from '@/prisma/generated/client'
import { notFound, redirect } from 'next/navigation'
import { getProducts } from '@/actions/product'
import { ProductGrid } from '@/components/product'
import { PagePagination, PageTitle } from '@/components/shared'
import { GenderMap } from '@/lib/constants'
import { getPageNumber } from '@/lib/helpers'

type GenderPageProps = PageProps<'/gender/[gender]'>

export async function generateMetadata({ params }: GenderPageProps): Promise<Metadata> {
  const { gender } = await params
  const genderDB = gender as Gender
  const currentGender = GenderMap[genderDB]

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

  const currentGender = GenderMap[genderDB]
  if (!currentGender) notFound()

  const page = await getPageNumber(searchParams)
  const { data } = await getProducts({ page, gender: genderDB })
  if (!data) notFound()

  const { products, totalPages } = data
  if (products.length === 0) redirect(`/gender/${genderDB}`)

  return (
    <>
      <PageTitle title={`Artículos para ${currentGender}`} />
      <ProductGrid products={products} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
