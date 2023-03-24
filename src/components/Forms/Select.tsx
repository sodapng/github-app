import { PureComponent } from 'react'

type SelectProperties = {
  label: string
  name: string
  forwardRef?: React.Ref<HTMLSelectElement>
  options: string[]
  isInvalid?: boolean
  errorMessage?: string
}

export class Select extends PureComponent<SelectProperties> {
  render() {
    const { label, name, options = [], forwardRef, errorMessage, isInvalid } = this.props

    return (
      <div>
        <label>
          <select
            data-testid="select"
            ref={forwardRef}
            className="form-select mt-1 block w-full"
            name={name}
            defaultValue={label}
          >
            <option
              disabled
              value={label}
              hidden
              className="text-gray-700"
            >
              {label}
            </option>
            {options.map((value) => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}
          </select>
        </label>
        {isInvalid && <span className="block text-red-700">Error: {errorMessage}</span>}
      </div>
    )
  }
}
