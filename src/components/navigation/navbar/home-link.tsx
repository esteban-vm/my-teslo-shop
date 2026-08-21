import { HandbagIcon, ShirtIcon } from 'lucide-react'
import NextLink from 'next/link'
import tw from 'tailwind-styled-components'

export function HomeLink() {
  return (
    <>
      <Link className='motion-safe:hidden' href='/'>
        <span className='text-rose-700'>Teslo</span> | Shop
      </Link>
      <Link className='text-rotate duration-30000 motion-reduce:hidden' href='/'>
        <span className='justify-items-center'>
          <span className='text-rose-700'>
            <Icon $as={ShirtIcon} /> Teslo
          </span>
          <span>
            <Icon $as={HandbagIcon} /> Shop
          </span>
        </span>
      </Link>
    </>
  )
}

const Link = tw(NextLink)`ml-3 font-montserrat font-semibold text-lg hover:opacity-75`
const Icon = tw.svg`inline fill-current/50 align-text-bottom`
