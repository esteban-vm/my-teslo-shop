import { SearchIcon } from 'lucide-react'
import { Input } from 'rsc-daisyui'

export function SearchInput() {
  return (
    <Input as='label'>
      <SearchIcon />
      <input placeholder='Buscar' type='search' />
    </Input>
  )
}
