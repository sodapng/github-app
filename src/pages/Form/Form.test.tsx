import { renderWithProviders } from '__tests__/renderWithProviders'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from 'pages'
import { test, vi } from 'vitest'

test('Form page', async () => {
  window.URL.createObjectURL = vi.fn()

  const userCards = [
    {
      userame: 'sodapng',
      brithdate: '2020-05-24',
      country: 'Russia',
      profilePicture: new File(['avatar'], 'my_photo.png', { type: 'image/png' }),
      subscribe: true,
      sex: 'Male',
    },
    {
      userame: 'react_best',
      brithdate: '2013-05-29',
      country: 'United States',
      profilePicture: new File(['avatar'], 'react.png', { type: 'image/png' }),
      subscribe: true,
      sex: 'Female',
    },
  ]

  renderWithProviders(<Form />)

  const user = userEvent.setup()

  const username = screen.getByTestId<HTMLInputElement>('input-text')
  const birthdate = screen.getByTestId<HTMLInputElement>('input-date')
  const country = screen.getByTestId<HTMLSelectElement>('select')
  const profilePicture = screen.getByTestId<HTMLInputElement>('input-file')
  const subscribe = screen.getByTestId<HTMLInputElement>('input-checkbox')
  const [male, female] = screen.getAllByTestId<HTMLInputElement>('input-radio')
  const sendButton = screen.getByText<HTMLInputElement>('Send')

  for await (const userCard of userCards) {
    fireEvent.change(username, { target: { value: userCard.userame } })
    fireEvent.change(birthdate, { target: { value: userCard.brithdate } })
    await user.selectOptions(country, userCard.country)
    await user.click(subscribe)
    await user.upload(profilePicture, userCard.profilePicture)

    if (userCard.sex === 'Male') {
      await user.click(male)
    }

    if (userCard.sex === 'Female') {
      await user.click(female)
    }

    await user.click(sendButton)

    expect(screen.getByText(userCard.userame)).toBeInTheDocument()
    expect(screen.getByText(new Date(userCard.brithdate).toLocaleDateString())).toBeInTheDocument()
    expect(screen.getByText(userCard.country, { selector: 'span' })).toBeInTheDocument()
  }

  expect(screen.getAllByText('subscribed').length).toBe(userCards.length)
  expect(screen.getAllByRole('img').length).toBe(userCards.length)
})
