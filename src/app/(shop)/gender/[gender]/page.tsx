export const revalidate = 60 // 1 minuto

import type { Metadata } from 'next'
import type { Gender } from '@/prisma/generated/enums'
import { notFound, redirect } from 'next/navigation'
import { getProducts } from '@/actions/product'
import { ProductGrid } from '@/components/product'
import { PagePagination, PageTitle } from '@/components/shared'
import { GENDER_MAP } from '@/lib/constants'
import { getParams } from '@/lib/helpers'

export type Props = PageProps<'/gender/[gender]'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gender } = await params
  const genderDB = gender as Gender
  const currentGender = GENDER_MAP[genderDB]

  if (!currentGender) {
    return {
      title: 'Género no encontrado',
    }
  }

  return {
    title: `Artículos para ${currentGender}`,
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { gender } = await params
  const genderDB = gender as Gender

  const currentGender = GENDER_MAP[genderDB]
  if (!currentGender) notFound()

  const { page } = await getParams(searchParams)
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
