export const Submit = ({ value }: { value: string }) => {
  return (
    <input
      className='cursor-pointer rounded-md border px-6 py-2 text-lg font-semibold text-slate-600 hover:bg-slate-50'
      type='submit'
      value={value}
    />
  )
}
