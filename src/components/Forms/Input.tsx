import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type InputProperties<TFormValues extends FieldValues> = {
  label: string
  name: Path<TFormValues>
  errors: Record<string, unknown>
  register: UseFormRegister<TFormValues>
  rules?: RegisterOptions
}

export const Input = <TFormValues extends FieldValues>({
  label,
  name,
  errors,
  register,
  rules,
}: InputProperties<TFormValues>) => {
  return (
    <div>
      <label className='cursor-pointer'>
        <span className='text-gray-700'>{label}</span>
        <input
          {...register(name, rules)}
          data-testid='input-text'
          className='form-input my-1 block w-full'
          type='text'
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
