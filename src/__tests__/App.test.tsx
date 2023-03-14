import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'routes'
import { describe, expect, it, test } from 'vitest'

test('landing on a not found page', () => {
  const badRoute = '/some/bad/route'

  const router = createMemoryRouter(routes, {
    initialEntries: [badRoute],
  })

  const { getByText } = render(<RouterProvider router={router} />)

  expect(getByText('Oops🔥'))
  expect(getByText('Not Found'))
})

describe('About Us Page', () => {
  it('landing on a about us page', () => {
    const aboutRoute = '/about'

    const router = createMemoryRouter(routes, {
      initialEntries: [aboutRoute],
    })

    const { getByText } = render(<RouterProvider router={router} />)

    expect(getByText('About Us💡'))
  })
})
