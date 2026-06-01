import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button, List } from 'rsc-daisyui'
import { CounterInput } from '@/components/shared'

export function CartItem() {
  return (
    <List.Row className='items-center py-2 last:pb-3'>
      <div className='relative size-24 overflow-hidden rounded-box'>
        <Image alt='' fill src='/image.jpg' />
      </div>
      <List.ColGrow>
        <h3 className='text-lg tracking-wide'>Title</h3>
        <p>$30</p>
        <CounterInput onDecrease={() => {}} onIncrease={() => {}} quantity={1} />
      </List.ColGrow>
      <Button ghost shape='square' size='sm'>
        <Trash2 className='stroke-current/75' />
      </Button>
    </List.Row>
  )
}
