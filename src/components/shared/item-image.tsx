import Image from 'next/image'

export interface ItemImageProps {
  title: string
  image: string
}

export function ItemImage({ title, image }: ItemImageProps) {
  return (
    <div className='relative size-24 overflow-hidden rounded-box'>
      <Image alt={title} fill src={`/products/${image}`} />
    </div>
  )
}
