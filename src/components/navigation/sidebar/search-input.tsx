import { Search } from 'lucide-react'
import { Input } from 'rsc-daisyui'

export function SearchInput() {
  return (
    <Input as='label'>
      <Search />
      <input placeholder='Buscar' type='search' />
    </Input>
  )
}
