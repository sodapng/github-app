import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type SelectProperties<TFormValues extends FieldValues> = {
  label: string
  name: Path<TFormValues>
  errors: Record<string, unknown>
  register: UseFormRegister<TFormValues>
  rules?: RegisterOptions
  options: Array<{ id: number; label: string; value: string }>
}

export const Select = <TFormValues extends FieldValues>({
  errors,
  label,
  name,
  register,
  rules,
  options,
}: SelectProperties<TFormValues>) => {
  return (
    <div>
      <select
        {...register(name, rules)}
        defaultValue=""
        data-testid="select"
        className="form-select mt-1 block w-full cursor-pointer"
      >
        <option
          value=""
          disabled
          hidden
        >
          {label}
        </option>
        {options.map(({ id, label, value }) => (
          <option
            key={id}
            value={label}
          >
            {value}
          </option>
        ))}
      </select>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <span className="text-red-700">Error: {message}</span>}
      />
    </div>
  )
}
