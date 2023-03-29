import { fireEvent, render, screen } from '@testing-library/react'
import { Search } from 'components'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'routes'
import { expect, test } from 'vitest'

test('Проверяем компонент Search с помощью fireEvent для проверки изменения состояния при вводе 23', () => {
  render(<Search />)
  const input = screen.getByLabelText<HTMLInputElement>('search')
  expect(input).toBeInTheDocument()
  fireEvent.change(input, { target: { value: '23' } })
  expect(input.value).toBe('23')
})

test('Тестируем сохранение значения ввода в localStorage', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  })

  const { unmount } = render(<RouterProvider router={router} />)

  const input = screen.getByLabelText<HTMLInputElement>('search')
  expect(input).toBeInTheDocument()
  fireEvent.change(input, { target: { value: 'sodapng' } })
  expect(input.value).toBe('sodapng')
  unmount()
  expect(input.value).toBe('sodapng')
  expect(localStorage.getItem('searchValue')).toBe('sodapng')
})
