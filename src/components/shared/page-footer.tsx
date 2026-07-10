import { Footer } from 'rsc-daisyui'

export function PageFooter() {
  return (
    <Footer center className='sm:footer-horizontal px-4 pt-0 pb-2 text-base-content'>
      <aside>
        <p className='font-montserrat font-semibold text-xs'>
          <span className='text-rose-500'>Teslo</span> | Shop © {new Date().getFullYear()}
        </p>
      </aside>
    </Footer>
  )
}
