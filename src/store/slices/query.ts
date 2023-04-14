import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type QueryState = {
  value: string
}

const initialState: QueryState = {
  value: '',
}

const slice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<{ value: string }>) => {
      state.value = action.payload.value
    },
  },
})

export const { reducer: queryReducer, actions: queryActions } = slice
