import Image from 'next/image'
import { cn } from '@/lib/ui'

export interface ItemImageProps {
  title: string
  image: string
  className?: string
}

export function ItemImage({ title, image, className }: ItemImageProps) {
  return (
    <div className={cn('relative size-24 overflow-hidden', className)}>
      <Image alt={title} fill src={`/products/${image}`} />
    </div>
  )
}
