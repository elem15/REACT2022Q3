import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from 'components/Main/Main';

const initialState = {
  docs: [] as ICharacter[],
  modalDoc: null as ICharacter | null,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacters: (state, action: PayloadAction<ICharacter[]>) => {
      state.docs = action.payload;
    },
    createDetailPage: (state, action) => {
      state.modalDoc = state.docs.find((item) => item._id === action.payload) || null;
    },
  },
});

export const { addCharacters, createDetailPage } = charactersSlice.actions;
export default charactersSlice.reducer;
