import { PureComponent } from 'react'

type DatePickerProperties = {
  label: string
  name: string
  forwardRef?: React.Ref<HTMLInputElement>
  isInvalid?: boolean
  errorMessage?: string
  max?: string
}

export class DatePicker extends PureComponent<DatePickerProperties> {
  render() {
    const { label, name, isInvalid, errorMessage, forwardRef, max } = this.props

    return (
      <div>
        <label>
          <span className="text-gray-700">{label}</span>
          <input
            data-testid="input-date"
            ref={forwardRef}
            className="form-input my-1 block w-full"
            type="date"
            name={name}
            max={max}
          />
        </label>
        {isInvalid && <span className="text-red-700">Error: {errorMessage}</span>}
      </div>
    )
  }
}
