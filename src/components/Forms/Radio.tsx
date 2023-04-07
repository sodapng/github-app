import { forwardRef } from 'react'

type RadioProperties = {
  label: string
  value: string
} & Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'value'
>

export const Radio = forwardRef<HTMLInputElement, RadioProperties>(function Radio(
  { label, ...properties },
  reference,
) {
  return (
    <label className='inline-flex cursor-pointer items-center'>
      <input
        ref={reference}
        {...properties}
        data-testid='input-radio'
        className='form-radio'
        type='radio'
      />
      <span className='ml-2 text-gray-700'>{label}</span>
    </label>
  )
})
