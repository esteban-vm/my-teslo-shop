import { cn } from '@/lib/ui'
import { ProductImage } from './product-image'

export interface ItemImageProps {
  title: string
  image: string
  className?: string
}

export function ItemImage({ title, image, className }: ItemImageProps) {
  return (
    <div className={cn('relative size-24 overflow-hidden', className)}>
      <ProductImage alt={title} fill src={image} />
    </div>
  )
}
