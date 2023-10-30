import { fireEvent, render, screen } from '@testing-library/react'
import { Search } from 'components'
import { expect, test } from 'vitest'

test('Проверяем компонент Search с помощью fireEvent для проверки изменения состояния при вводе 23', () => {
  render(<Search />)
  const input = screen.getByTestId<HTMLInputElement>('search')
  expect(input).toBeInTheDocument()
  fireEvent.change(input, { target: { value: '23' } })
  expect(input.value).toBe('23')
})
