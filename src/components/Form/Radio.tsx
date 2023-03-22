import { PureComponent } from 'react'

type RadioProperties = {
  label: string
  name: string
  forwardRef?: React.RefObject<HTMLInputElement>
}

export class Radio extends PureComponent<RadioProperties> {
  render() {
    const { label, name, forwardRef } = this.props

    return (
      <label className="inline-flex items-center">
        <input
          ref={forwardRef}
          className="form-radio"
          type="radio"
          name={name}
          defaultValue={label}
        />
        <span className="ml-2 text-gray-700">{label}</span>
      </label>
    )
  }
}
