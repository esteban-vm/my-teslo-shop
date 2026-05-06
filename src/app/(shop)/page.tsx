import { redirect } from 'next/navigation'
import { ProductActions } from '@/actions'

export default async function ShopPage({ searchParams }: PageProps<'/'>) {
  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const results = await ProductActions.getProductsWithImages({ page: Number.parseInt(page, 10) })
  if (results.products.length === 0) redirect('/?page=1')

  console.log({ products: results })

  return (
    <pre>
      {/* {JSON.stringify(
        results.map((r) => ({ name: r.title })),
        null,
        1
      )} */}
    </pre>
  )
}
