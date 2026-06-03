import { useEffect, useState } from 'react'
import { sleepExecution } from '@/lib/helpers'

export const useMounted = (delay = 2) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mount = async () => {
      await sleepExecution(delay)
      setMounted(true)
    }

    mount()
  }, [delay])

  return { mounted }
}
