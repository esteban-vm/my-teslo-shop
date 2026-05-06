'use client'

import { Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui'

export function Navigation() {
  return (
    <NavigationMenu className='fixed top-0 z-10 min-w-screen bg-white py-2'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href='/' />}>
            <span className='font-bold font-geist'>Teslo</span>|&nbsp;&nbsp;Shop
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href='/' />}>
            Hombres
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href='/' />}>
            Mujeres
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href='/' />}>
            Niños
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href='/' />}>
            <Search />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href='/' />}>
            <ShoppingCart />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href='/' />}>
            Menú
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
