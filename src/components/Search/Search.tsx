import { useUnmount } from 'hooks'
import { ChangeEvent, useState } from 'react'

export function Search() {
  const [value, setValue] = useState(localStorage.getItem('searchValue') ?? '')

  useUnmount(() => {
    localStorage.setItem('searchValue', value)
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <input
      aria-label="search"
      className="mb-3 w-72 appearance-none rounded-md border px-3 py-1 outline-none focus-within:border-violet-500 focus-within:ring focus-within:ring-violet-300 focus-within:ring-offset-1"
      type="search"
      onChange={handleChange}
      value={value}
    />
  )
}
