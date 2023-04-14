export const Submit = ({ value }: { value: string }) => {
  return (
    <input
      className='cursor-pointer border border-gray-500 px-6 py-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
      type='submit'
      value={value}
    />
  )
}
