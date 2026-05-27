import { Join } from 'rsc-daisyui'

export function QuantityCounter() {
  return (
    <>
      <p className='font-semibold'>Cantidad:</p>
      <Join className='space-x-1'>
        <Join.Button className='rounded-full' size='sm'>
          -
        </Join.Button>
        <Join.Input as='label' className='rounded-full outline-none' size='sm'>
          <input className='text-center' defaultValue={0} max={5} maxLength={1} min={0} readOnly size={1} type='text' />
        </Join.Input>
        <Join.Button className='rounded-full' size='sm'>
          +
        </Join.Button>
      </Join>
    </>
  )
}
