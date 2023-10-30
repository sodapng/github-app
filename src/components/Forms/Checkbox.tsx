import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type CheckboxProperties<TFormValues extends FieldValues> = {
  label: string
  name: Path<TFormValues>
  errors: Record<string, unknown>
  register: UseFormRegister<TFormValues>
  rules?: RegisterOptions
}

export const Checkbox = <TFormValues extends FieldValues>({
  errors,
  label,
  name,
  register,
  rules,
}: CheckboxProperties<TFormValues>) => {
  return (
    <div>
      <label className='inline-flex cursor-pointer items-center'>
        <input
          {...register(name, rules)}
          data-testid='input-checkbox'
          className='form-checkbox cursor-pointer'
          type='checkbox'
        />
        <span className='ml-2 text-gray-700'>{label}</span>
      </label>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <span className='block text-red-700'>Error: {message}</span>}
      />
    </div>
  )
}
