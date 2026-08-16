export function getProductImage(src?: string) {
  let imageSrc: string

  if (typeof src === 'string') {
    if (src.startsWith('http') || src.startsWith('/imgs')) imageSrc = src
    else imageSrc = `/products/${src}`
  } else {
    imageSrc = '/imgs/placeholder.jpg'
  }

  return imageSrc
}
