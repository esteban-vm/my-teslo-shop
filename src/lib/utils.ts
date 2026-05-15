import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DRAWER_ID } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function closeSidebar() {
  const checkbox = document.getElementById(DRAWER_ID) as HTMLInputElement
  checkbox.checked = false
}
