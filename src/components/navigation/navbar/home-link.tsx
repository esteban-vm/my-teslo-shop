import Link from 'next/link'
import tw from 'tailwind-styled-components'

export function HomeLink() {
  return (
    <LinkContainer $as={Link} href='/'>
      <span className='font-bold text-rose-700'>Teslo</span> | Shop
    </LinkContainer>
  )
}

const LinkContainer = tw.a`ml-3 font-montserrat font-semibold hover:opacity-75`
