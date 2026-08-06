import NextLink from 'next/link'
import tw from 'tailwind-styled-components'

export function HomeLink() {
  return (
    <>
      <Link className='motion-safe:hidden' href='/'>
        <Bold>Teslo</Bold> | Shop
      </Link>

      <Link className='text-rotate duration-30000 motion-reduce:hidden' href='/'>
        <span className='justify-items-center'>
          <Bold>🏪 Teslo</Bold>
          <span>🛒 Shop</span>
        </span>
      </Link>
    </>
  )
}

const Link = tw(NextLink)`ml-3 font-montserrat font-semibold text-lg hover:opacity-75`
const Bold = tw.span`font-bold text-rose-700`
