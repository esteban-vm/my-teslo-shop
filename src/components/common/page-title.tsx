export interface PageTitleProps {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className='mt-4 ml-4 font-montserrat'>
      <h1 className='font-bold text-2xl'>{title}</h1>
      {subtitle && <h2 className='font-semibold text-xl'>{subtitle}</h2>}
    </div>
  )
}
