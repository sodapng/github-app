import { PureComponent } from 'react'

type CheckboxProperties = {
  label: string
  name: string
  required?: boolean
  forwardRef?: React.Ref<HTMLInputElement>
  isInvalid?: boolean
  errorMessage?: string
}

export class Checkbox extends PureComponent<CheckboxProperties> {
  render() {
    const { label, name, required, forwardRef, errorMessage, isInvalid } = this.props

    return (
      <div>
        <label className="inline-flex items-center">
          <input
            data-testid="input-checkbox"
            ref={forwardRef}
            className="form-checkbox"
            type="checkbox"
            name={name}
            required={required}
          />
          <span className="ml-2 text-gray-700">{label}</span>
        </label>
        {isInvalid && <span className="block text-red-700">Error: {errorMessage}</span>}
      </div>
    )
  }
}
