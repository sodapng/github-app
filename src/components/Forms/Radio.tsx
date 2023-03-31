import { forwardRef } from 'react'

type RadioProperties = {
  label: string
  value: string
} & Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'value'
>

// eslint-disable-next-line react/display-name
export const Radio = forwardRef<HTMLInputElement, RadioProperties>(
  ({ label, ...properties }, reference) => {
    return (
      <label className="inline-flex cursor-pointer items-center">
        <input
          ref={reference}
          {...properties}
          data-testid="input-radio"
          className="form-radio"
          type="radio"
        />
        <span className="ml-2 text-gray-700">{label}</span>
      </label>
    )
  },
)
