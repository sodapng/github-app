import { PureComponent } from 'react'

type SelectProperties = {
  label: string
  name: string
  required?: boolean
  forwardRef?: React.RefObject<HTMLSelectElement>
  options: string[]
}

export class Select extends PureComponent<SelectProperties> {
  render() {
    const { label, name, required = true, options = [], forwardRef } = this.props

    return (
      <label>
        <span className="text-gray-700">{label}</span>
        <select
          ref={forwardRef}
          className="form-select mt-1 block w-full"
          name={name}
          required={required}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    )
  }
}
