import type { ReactNode } from 'react'
import { Button } from 'rsc-daisyui'
import { cn } from '@/lib/ui'

export interface SliderButtonProps {
  icon: ReactNode
  isLeft?: boolean
  onClick: () => void
}

export function SliderButton({ isLeft, icon, onClick }: SliderButtonProps) {
  return (
    <div className={cn('absolute top-1/2 z-10 -translate-y-1/2', isLeft && 'left-full -translate-x-full')}>
      <Button onClick={onClick} shape='circle' soft type='button'>
        {icon}
      </Button>
    </div>
  )
}
