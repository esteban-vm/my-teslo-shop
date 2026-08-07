import type { ProductsDB } from '@/schemas/product'
import tw from 'tailwind-styled-components'
import { ProductCard } from './product-card'

export function ProductGrid({ products }: { products: ProductsDB }) {
  return (
    <GridContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridContainer>
  )
}

const GridContainer = tw.main`grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
