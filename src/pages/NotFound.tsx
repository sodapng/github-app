export function NotFound() {
  return (
    <div className='mx-auto flex w-full flex-auto flex-col items-center justify-center space-y-10 px-12 font-mono'>
      <h1 className='text-9xl font-bold'>Oops🔥</h1>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-xl'>Sorry, an unexpected error has occurred.</p>
        <p>
          <i className='text-slate-600'>Not Found</i>
        </p>
      </div>
    </div>
  )
}
