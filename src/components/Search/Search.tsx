import { useUnmount } from 'hooks'
import { type ChangeEvent, useState } from 'react'

type SearchProperties = {
  value?: string
  onChange?: (value: string) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

export function Search({ onChange, onKeyDown, value: initialValue = '' }: SearchProperties) {
  const [value, setValue] = useState(localStorage.getItem('searchValue') ?? initialValue)

  useUnmount(() => {
    localStorage.setItem('searchValue', value)
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
    onChange?.(value)
  }

  return (
    <input
      aria-label='search'
      className='mb-3 w-72 appearance-none rounded-md border px-3 py-1 outline-none focus-within:border-violet-500 focus-within:ring focus-within:ring-violet-300 focus-within:ring-offset-1'
      type='search'
      onChange={handleChange}
      onKeyDown={onKeyDown}
      value={value}
    />
  )
}
