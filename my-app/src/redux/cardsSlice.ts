import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from 'components/Cards/Cards';

interface CardsState {
  cards: ICard[];
}

const initialState: CardsState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<ICard>) => {
      state.cards.push(action.payload);
    },
  },
});

export const { addCard } = cardSlice.actions;

export default cardSlice.reducer;
