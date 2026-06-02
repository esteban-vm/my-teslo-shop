import { Skeleton } from 'rsc-daisyui'
import { ELLIPSIS_CHAR } from '@/lib/constants'

export function SkeletonLoader({ text }: { text: string }) {
  return (
    <Skeleton className='px-4 py-2 font-montserrat font-semibold text-sm' text>
      {text}
      {ELLIPSIS_CHAR}
    </Skeleton>
  )
}
