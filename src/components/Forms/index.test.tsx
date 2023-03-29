import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

import { Checkbox } from './Checkbox'
import { DatePicker } from './DatePicker'
import { Input } from './Input'
import { InputFile } from './InputFile'
import { Radio } from './Radio'
import { RadioGroup } from './RadioGroup'
import { Select } from './Select'

test('Checkbox', () => {
  render(
    <Checkbox
      label="Подписаться на рассылку"
      name="subscribe"
    />,
  )

  const inputCheckbox = screen.getByRole<HTMLInputElement>('checkbox')
  expect(inputCheckbox).toBeInTheDocument()
  fireEvent.click(inputCheckbox)
  expect(inputCheckbox).toBeChecked()
  fireEvent.click(inputCheckbox)
  expect(inputCheckbox).not.toBeChecked()
})

test('Radio', () => {
  render(
    <Radio
      label="Male"
      name="sex"
    />,
  )

  const inputRadio = screen.getByRole<HTMLInputElement>('radio')
  expect(inputRadio).toBeInTheDocument()
  expect(inputRadio).not.toBeChecked()
  fireEvent.click(inputRadio)
  expect(inputRadio).toBeChecked()
})

test('RadioGrouop', () => {
  const genderOptions = [
    { id: 0, label: 'Male' },
    { id: 1, label: 'Female' },
  ]

  render(
    <RadioGroup
      options={genderOptions}
      name="sex"
    />,
  )

  const maleElement = screen.getByLabelText('Male')
  const femaleElement = screen.getByLabelText('Female')
  expect(maleElement).toBeInTheDocument()
  expect(femaleElement).toBeInTheDocument()

  fireEvent.click(femaleElement)
  expect(femaleElement).toBeChecked()
  fireEvent.click(maleElement)
  expect(femaleElement).not.toBeChecked()
  expect(maleElement).toBeChecked()
})

test('Select', async () => {
  const countries = ['Россия', 'Казахстан', 'США']

  render(
    <Select
      name="country"
      options={countries}
      label="Country"
    />,
  )

  const user = userEvent.setup()

  const selectElement = screen.getByTestId('select')
  expect(selectElement).toBeInTheDocument()
  await user.selectOptions(selectElement, 'США')
  expect(screen.getByRole<HTMLOptionElement>('option', { name: 'США' }).selected).toBeTruthy()
  await user.selectOptions(selectElement, 'Россия')
  expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Россия' }).selected).toBeTruthy()
  expect(screen.getByRole<HTMLOptionElement>('option', { name: 'США' }).selected).not.toBeTruthy()
})

test('Input Text', () => {
  const value = 'какой-то текст'

  render(
    <Input
      label="Username"
      name="username"
    />,
  )

  const inputElement = screen.getByLabelText<HTMLInputElement>('Username')
  expect(inputElement).toBeInTheDocument()
  fireEvent.change(inputElement, { target: { value } })
  expect(inputElement.value).toBe(value)
})

test('DatePicker', () => {
  const value = '1995-02-15'

  render(
    <DatePicker
      label="Date of birth"
      name="birthdate"
    />,
  )

  const inputElement = screen.getByLabelText<HTMLInputElement>('Date of birth')
  expect(inputElement).toBeInTheDocument()
  fireEvent.change(inputElement, { target: { value } })
  expect(inputElement.value).toBe(value)
})

test('Input File', async () => {
  const file = new File(['hello'], 'hello.png', { type: 'image/png' })

  render(
    <InputFile
      label="Avatar"
      name="avatar"
    />,
  )

  const user = userEvent.setup()

  const inputFileElement = screen.getByLabelText<HTMLInputElement>('Avatar')
  expect(inputFileElement).toBeInTheDocument()
  await user.upload(inputFileElement, file)

  expect(inputFileElement.files?.[0]).toStrictEqual(file)
  expect(inputFileElement.files?.[0].name).toBe(file.name)
})
