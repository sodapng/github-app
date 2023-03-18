import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search } from 'components/Search'
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

test('Тестируем переходы между страницами и сохранение значения ввода в localStorage', async () => {
  const user = userEvent.setup()

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  })

  render(<RouterProvider router={router} />)

  expect(screen.getByText('Current page: /')).toBeInTheDocument()
  await user.click(screen.getByText('About'))

  expect(screen.getByText('About Us💡'))
  expect(screen.getByText('Current page: /about'))

  await user.click(screen.getByText('Home'))

  const input = screen.getByLabelText<HTMLInputElement>('search')
  expect(input).toBeInTheDocument()
  fireEvent.change(input, { target: { value: 'sodapng' } })
  expect(input.value).toBe('sodapng')
  await user.click(screen.getByText('About'))
  await user.click(screen.getByText('Home'))
  expect(input.value).toBe('sodapng')
  expect(localStorage.getItem('searchValue')).toBe('sodapng')
})
