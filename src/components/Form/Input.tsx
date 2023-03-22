import { PureComponent } from 'react'

type InputProperties = {
  type?: 'text' | 'date'
  label: string
  name: string
  forwardRef?: React.RefObject<HTMLInputElement>
  isInvalid?: boolean
  errorMessage?: string
  max?: string
}

export class Input extends PureComponent<InputProperties> {
  render() {
    const { type = 'text', label, name, isInvalid, errorMessage, forwardRef, max } = this.props

    return (
      <div>
        <label>
          <span className="text-gray-700">{label}</span>
          <input
            ref={forwardRef}
            className="form-input my-1 block w-full"
            type={type}
            name={name}
            max={type === 'date' ? max : undefined}
          />
        </label>
        {isInvalid && <span className="text-red-700">Error: {errorMessage}</span>}
      </div>
    )
  }
}
