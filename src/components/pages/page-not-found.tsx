import { Frown } from 'lucide-react'
import Image from 'next/image'
import NextLink from 'next/link'
import { Link } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export function PageNotFound({ title = 'Página no encontrada' }: { title?: string }) {
  return (
    <Container>
      <ImageContainer>
        <Image alt={title} fill src='/imgs/not-found.png' />
      </ImageContainer>
      <div className='text-center font-montserrat text-error'>
        <h1 className='font-bold text-4xl'>
          404 <Frown className='inline size-12 fill-current/25 align-bottom' />
        </h1>
        <h2 className='font-semibold text-xl'>{title}</h2>
        <NextLink href='/' passHref>
          <Link as='span' className='font-geist font-semibold' color='info'>
            Regresar al inicio
          </Link>
        </NextLink>
      </div>
    </Container>
  )
}

const Container = tw.div`flex h-full min-h-144 flex-col items-center justify-evenly md:flex-row-reverse md:justify-center md:gap-4`
const ImageContainer = tw.div`relative aspect-square w-full max-w-md`
