import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from 'components/Cards/Cards';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';
import { IForm } from 'components/Form/FormContainer';

interface IFormContext {
  handleSubmit?: UseFormHandleSubmit<FieldValues>;
  register?: UseFormRegister<FieldValues & IForm>;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >;
}
interface CardsState {
  cards: ICard[];
  form: IFormContext;
}

const initialState: CardsState = {
  cards: [],
  form: {},
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setFormState: (state, action) => {
      state.form = action.payload;
    },
    addCard: (state, action: PayloadAction<ICard>) => {
      state.cards.push(action.payload);
    },
  },
});

export const { addCard, setFormState } = cardSlice.actions;

export default cardSlice.reducer;
