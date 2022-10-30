import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter, IName, IState } from 'components/Main/Main';
import { Mode } from 'helpers/constants/mode';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';

interface IMainState {
  names: IName[];
  docs: ICharacter[] | [];
  state: IState;
}
interface ISearchParams {
  key: keyof IState;
  value: string | number;
}

const initialState: IMainState = {
  names: [],
  docs: [],
  state: {
    loading: true,
    error: false,
    errorMessage: '',
    searchValue: '',
    page: 1,
    pages: 0,
    total: 0,
    limit: 10,
    mode: Mode.LIST,
    modalMode: false,
    modalDoc: null,
    order: SortingOrder.ASC,
    sort: SortingValues.DEFAULT,
    gender: GenderType.DEFAULT,
  },
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addNames: (state, action: PayloadAction<IName[]>) => {
      state.names = action.payload;
    },
    addCharacters: (state, action: PayloadAction<ICharacter[]>) => {
      state.docs = action.payload;
    },
    loadCharactersState: (state, action: PayloadAction<IState>) => {
      state.state = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.state.page = action.payload;
      state.state.loading = true;
    },
    changeSearchParams: (state, action: PayloadAction<ISearchParams>) => {
      const { key, value } = action.payload;
      state.state = { ...state.state, [key]: value };
    },
  },
});

export const { addNames, addCharacters, loadCharactersState, changePage, changeSearchParams } =
  mainSlice.actions;

export default mainSlice.reducer;
