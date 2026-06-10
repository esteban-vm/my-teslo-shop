import { MenuIcon } from 'lucide-react'
import { Button } from 'rsc-daisyui'
import { DRAWER_ID } from '@/lib/constants'

export function MenuButton() {
  return (
    <Button as='label' ghost htmlFor={DRAWER_ID} shape='square' size='sm'>
      <MenuIcon className='size-[90%]' />
    </Button>
  )
}
