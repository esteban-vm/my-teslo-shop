import { useEffect, useState } from 'react'
import { sleepExecution } from '@/lib/helpers'

export const useMounted = (s = 2) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mount = async () => {
      await sleepExecution(s)
      setMounted(true)
    }

    mount()
  }, [s])

  return { mounted }
}
