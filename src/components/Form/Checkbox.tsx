import { PureComponent } from 'react'

type CheckboxProperties = {
  label: string
  name: string
  required?: boolean
  forwardRef?: React.RefObject<HTMLInputElement>
}

export class Checkbox extends PureComponent<CheckboxProperties> {
  render() {
    const { label, name, required, forwardRef } = this.props

    return (
      <label className="inline-flex items-center">
        <input
          ref={forwardRef}
          className="form-checkbox"
          type="checkbox"
          name={name}
          required={required}
        />
        <span className="ml-2 text-gray-700">{label}</span>
      </label>
    )
  }
}
