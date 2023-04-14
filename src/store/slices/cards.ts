import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TUserCard } from 'components'

type CardsState = {
  data: TUserCard[]
}

const initialState: CardsState = {
  data: [],
}

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ card: TUserCard }>) => {
      state.data.push(action.payload.card)
    },
  },
})

export const { reducer: cardsReducer, actions: cardsActions } = slice
