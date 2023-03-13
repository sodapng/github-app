import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'routes'
import { expect, test } from 'vitest'

test('landing on a bad page', () => {
  const badRoute = '/some/bad/route'

  const router = createMemoryRouter(routes, {
    initialEntries: [badRoute],
  })

  const { getByText } = render(<RouterProvider router={router} />)

  expect(getByText('Oops🔥'))
  expect(getByText('Not Found'))
})
