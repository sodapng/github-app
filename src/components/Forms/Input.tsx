import { PureComponent } from 'react'

type InputProperties = {
  label: string
  name: string
  forwardRef?: React.Ref<HTMLInputElement>
  isInvalid?: boolean
  errorMessage?: string
}

export class Input extends PureComponent<InputProperties> {
  render() {
    const { label, name, isInvalid, errorMessage, forwardRef } = this.props

    return (
      <div>
        <label>
          <span className="text-gray-700">{label}</span>
          <input
            data-testid="input-text"
            ref={forwardRef}
            className="form-input my-1 block w-full"
            type="text"
            name={name}
          />
        </label>
        {isInvalid && <span className="text-red-700">Error: {errorMessage}</span>}
      </div>
    )
  }
}
