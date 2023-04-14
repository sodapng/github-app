import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type InputFileProperties<TFormValues extends FieldValues> = {
  label: string
  name: Path<TFormValues>
  errors: Record<string, unknown>
  register: UseFormRegister<TFormValues>
  rules?: RegisterOptions
}

export const InputFile = <TFormValues extends FieldValues>({
  errors,
  label,
  name,
  register,
  rules,
}: InputFileProperties<TFormValues>) => {
  return (
    <div>
      <label className='mb-2 block cursor-pointer text-sm font-medium text-white'>
        <span className='text-gray-700'>{label}</span>
        <input
          {...register(name, rules)}
          data-testid='input-file'
          className='focus: relative m-0 mt-1 block w-full min-w-0 flex-auto cursor-pointer border border-solid border-gray-500 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-white file:px-3 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:cursor-pointer focus:border-blue-600 focus:text-neutral-700 focus:ring-1 focus:ring-blue-600 '
          type='file'
          accept='image/png, image/jpeg'
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
