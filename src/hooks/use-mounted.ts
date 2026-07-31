import { useEffect, useState } from 'react'
import { sleep } from '@/lib/helpers'

export function useMounted(delay = 2) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mount = async () => {
      await sleep(delay)
      setMounted(true)
    }

    mount()
  }, [delay])

  return { mounted }
}
