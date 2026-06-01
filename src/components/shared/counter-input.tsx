import { LucideMinus, LucidePlus } from 'lucide-react'
import { Join } from 'rsc-daisyui'

export interface CounterInputProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function CounterInput({ quantity, onIncrease, onDecrease }: CounterInputProps) {
  return (
    <Join className='space-x-1'>
      <Join.Button className='rounded-full' onClick={onDecrease} shape='square' size='sm'>
        <LucideMinus className='stroke-current/70' />
      </Join.Button>
      <Join.Input as='label' className='rounded-full outline-none' color='primary' size='sm'>
        <input className='text-center' maxLength={2} min={1} readOnly size={1} type='text' value={quantity} />
      </Join.Input>
      <Join.Button className='rounded-full' onClick={onIncrease} shape='square' size='sm'>
        <LucidePlus className='stroke-current/70' />
      </Join.Button>
    </Join>
  )
}
