import type { ReactNode } from 'react'
import { Button } from 'rsc-daisyui'
import { cn } from '@/lib/ui'

export interface SliderButtonProps {
  icon: ReactNode
  left?: boolean
  onClick: () => void
}

export function SliderButton({ left, icon, onClick }: SliderButtonProps) {
  return (
    <div className={cn('absolute top-1/2 z-10 -translate-y-1/2', left && 'left-full -translate-x-full')}>
      <Button className='[&_svg]:stroke-3!' color='info' glass onClick={onClick} shape='circle' type='button'>
        {icon}
      </Button>
    </div>
  )
}
