import { configureStore } from '@reduxjs/toolkit'
import { api } from 'store/services'
import { cardsReducer, queryReducer } from 'store/slices'

export const store = configureStore({
  reducer: {
    query: queryReducer,
    cards: cardsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
