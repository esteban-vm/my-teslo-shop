import { Skeleton } from 'rsc-daisyui'
import { ELLIPSIS_CHAR } from '@/lib/constants'

export function TextSkeleton({ text }: { text: string }) {
  return (
    <Skeleton className='py-2 text-center font-montserrat font-semibold text-sm' text>
      {text}
      {ELLIPSIS_CHAR}
    </Skeleton>
  )
}
