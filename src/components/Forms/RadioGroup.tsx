import { Radio } from 'components/Forms/Radio'
import { type MutableRefObject, PureComponent } from 'react'

type RadioGroupProperties = {
  name: string
  options: Array<{ id: number; label: string }>
  isInvalid?: boolean
  errorMessage?: string
  forwardRef?: MutableRefObject<HTMLInputElement[] | null>
}

export class RadioGroup extends PureComponent<RadioGroupProperties> {
  render() {
    const { name, options, forwardRef, isInvalid, errorMessage } = this.props

    return (
      <div>
        <div className="flex gap-4">
          {options.map(({ id, label }, index) => {
            return (
              <Radio
                key={id}
                label={label}
                name={name}
                forwardRef={(element) => {
                  if (element && forwardRef?.current) {
                    forwardRef.current[index] = element
                  }
                }}
              />
            )
          })}
        </div>
        {isInvalid && <span className="block text-red-700">Error: {errorMessage}</span>}
      </div>
    )
  }
}
