import type { ProductWithImages } from '@/types'
import tw from 'tailwind-styled-components'
import { ProductCard } from './product-card'

export function ProductGrid({ products }: { products: ProductWithImages[] }) {
  return (
    <GridContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridContainer>
  )
}

const GridContainer = tw.main`grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
// const GridContainer = tw.main`grid place-content-center gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
