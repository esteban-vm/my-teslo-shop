'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Menu } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()

  const onThemeChange = () => {
    setTheme((value) => (value === 'light' ? 'dark' : 'light'))
  }

  return (
    <Menu.Item as='div' className='self-center'>
      <Container title='Cambiar tema'>
        <input checked={resolvedTheme === 'dark'} onChange={onThemeChange} type='checkbox' />
        <Sun aria-label='sun' />
        <Moon aria-label='moon' />
      </Container>
    </Menu.Item>
  )
}

const Container = tw.label`toggle scale-[120%] text-base-content dark:rounded-full dark:before:rounded-full [&_svg]:size-full`
