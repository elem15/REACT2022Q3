import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IName } from 'components/Main/Main';

const initialState = { names: [] as IName[] };

export const namesSlice = createSlice({
  name: 'names',
  initialState,
  reducers: {
    addNames: (state, action: PayloadAction<IName[]>) => {
      state.names = action.payload;
    },
  },
});

export const { addNames } = namesSlice.actions;
export default namesSlice.reducer;
