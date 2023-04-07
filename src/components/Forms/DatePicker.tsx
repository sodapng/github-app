import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type DatePickerProperties<TFormValues extends FieldValues> = {
  label: string
  name: Path<TFormValues>
  errors: Record<string, unknown>
  register: UseFormRegister<TFormValues>
  rules?: RegisterOptions
  max?: string
}

export const DatePicker = <TFormValues extends FieldValues>({
  errors,
  label,
  name,
  register,
  rules,
  max,
}: DatePickerProperties<TFormValues>) => {
  return (
    <div>
      <label className='cursor-pointer'>
        <span className='text-gray-700'>{label}</span>
        <input
          {...register(name, rules)}
          max={max}
          data-testid='input-date'
          className='form-input my-1 block w-full cursor-pointer'
          type='date'
        />
      </label>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <span className='text-red-700'>Error: {message}</span>}
      />
    </div>
  )
}
