import { ErrorMessage } from '@hookform/error-message'
import { Radio } from 'components/Forms/Radio'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type RadioGroupProperties<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  errors: Record<string, unknown>
  register: UseFormRegister<TFormValues>
  rules?: RegisterOptions
  options: Array<{ id: number; label: string; value: string }>
}

export const RadioGroup = <TFormValues extends FieldValues>({
  errors,
  name,
  options,
  register,
  rules,
}: RadioGroupProperties<TFormValues>) => {
  return (
    <div>
      <div className="flex gap-4">
        {options.map(({ id, label, value }) => {
          return (
            <Radio
              key={id}
              label={label}
              value={value}
              {...register(name, rules)}
            />
          )
        })}
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <span className="text-red-700">Error: {message}</span>}
      />
    </div>
  )
}
