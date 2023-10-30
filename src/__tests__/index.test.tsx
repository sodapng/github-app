import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'routes'
import { expect, test } from 'vitest'

test('Тестируем отображение страницы 404 при переходе на несуществующий роут', () => {
  const badRoute = '/some/bad/route'

  const router = createMemoryRouter(routes, {
    initialEntries: [badRoute],
  })

  const { getByText } = render(<RouterProvider router={router} />)

  expect(getByText('Oops🔥')).toBeInTheDocument()
  expect(getByText('Not Found')).toBeInTheDocument()
})

test('Тестируем отображение страницы About при переходе на роут /about', () => {
  const aboutRoute = '/about'

  const router = createMemoryRouter(routes, {
    initialEntries: [aboutRoute],
  })

  const { getByText } = render(<RouterProvider router={router} />)

  expect(getByText('About Us💡')).toBeInTheDocument()
})
