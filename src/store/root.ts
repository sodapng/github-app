import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from 'store/services'
import { cardsReducer, queryReducer } from 'store/slices'

import { RootState } from './types'

const reducers = {
  query: queryReducer,
  cards: cardsReducer,
  [api.reducerPath]: api.reducer,
}

export const reducer = combineReducers(reducers)

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  })
}
