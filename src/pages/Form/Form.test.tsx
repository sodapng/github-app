import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, vi } from 'vitest'

import { Form } from './Form'

test('Form page', async () => {
  window.URL.createObjectURL = vi.fn()

  const userCards = [
    {
      userame: 'sodapng',
      brithdate: '2020-05-24',
      country: 'Россия',
      profilePicture: new File(['avatar'], 'my_photo.png', { type: 'image/png' }),
      subscribe: true,
      sex: 'Male',
    },
    {
      userame: 'react_best',
      brithdate: '2013-05-29',
      country: 'США',
      profilePicture: new File(['avatar'], 'react.png', { type: 'image/png' }),
      subscribe: false,
      sex: 'Female',
    },
  ]

  render(<Form />)

  const user = userEvent.setup()

  const username = screen.getByLabelText<HTMLInputElement>('Username')
  const birthdate = screen.getByLabelText<HTMLInputElement>('Date of birth')
  const country = screen.getByTestId<HTMLSelectElement>('select')
  const profilePicture = screen.getByTestId<HTMLInputElement>('input-file')
  const subscribe = screen.getByTestId<HTMLInputElement>('input-checkbox')
  const [male, female] = screen.getAllByTestId<HTMLInputElement>('input-radio')
  const sendButton = screen.getByRole('button')

  // eslint-disable-next-line no-restricted-syntax
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
  }

  expect(username.value).toBe('')
  expect(screen.getByText('sodapng')).toBeInTheDocument()
  expect(screen.getByText('react_best')).toBeInTheDocument()
  expect(screen.getAllByRole('img').length).toBe(userCards.length)

  await user.click(sendButton)
  expect(
    screen.getByText(
      'Error: Invalid username, You can use the characters a-z, A-Z, 0-9 and underscore, String must contain at least 5 character(s)',
    ),
  ).toBeInTheDocument()
})
