'use client'

import { useTheme } from '@teispace/next-themes'
import { MoonStar, Sun } from 'lucide-react'
import { Menu, Skeleton } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { useMounted } from '@/hooks'

export function ThemeSwitch() {
  const { mounted } = useMounted(5)
  const { theme, resolvedTheme, setTheme } = useTheme()

  if (!mounted) {
    return <Skeleton className='mx-auto h-8 w-16 rounded-full' />
  }

  const onThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Menu.Item as='div' className='self-center'>
      <Toggle title='Cambiar tema'>
        <input checked={resolvedTheme === 'dark'} onChange={onThemeChange} type='checkbox' />
        <Sun aria-label='sun' className='fill-current' />
        <MoonStar aria-label='moon' />
      </Toggle>
    </Menu.Item>
  )
}

const Toggle = tw.label`toggle scale-[120%] rounded-full text-base-content before:rounded-full [&_svg]:size-full`
