type ErrorData = {
  _errors: string[]
}

export const convertErrorsToString = (data?: ErrorData) => {
  return data?._errors.join(', ')
}
