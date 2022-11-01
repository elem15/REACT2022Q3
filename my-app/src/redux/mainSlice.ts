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
    modalDoc: null,
    order: SortingOrder.ASC,
    sort: SortingValues.DEFAULT,
    gender: GenderType.DEFAULT,
    timer: null,
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
    setSearchParams: (state, action: PayloadAction<ISearchParams>) => {
      const { key, value } = action.payload;
      const { total, pages, page } = state.state;
      if (key === 'pages' && total) {
        const newLimit = Math.ceil(total / +value);
        state.state.limit = newLimit > 50 ? 50 : newLimit;
        const newMaxPage = newLimit > 50 ? Math.ceil(total / 50) : +value;
        state.state.pages = newMaxPage;
        state.state.page = page <= newMaxPage ? page : newMaxPage;
      } else if (key === 'limit' && total) {
        const newTotalPages = Math.ceil(total / +value);
        const newMaxPage = newTotalPages > 200 ? 200 : newTotalPages;
        state.state.pages = newMaxPage;
        state.state.page = page <= newMaxPage ? page : newMaxPage;
        state.state.limit = newTotalPages > 200 ? Math.ceil(total / 200) : +value;
      } else if (key === 'page') {
        const newValue = +value && +value;
        state.state.page = newValue <= pages ? newValue : pages;
      } else {
        state.state = { ...state.state, [key]: +value ? +value : value };
      }
    },
    enableSearchMode: (state) => {
      state.state.loading = true;
      state.state.mode = Mode.SEARCH;
    },
    enableListMode: (state) => {
      state.state.loading = true;
      state.state.mode = Mode.LIST;
    },
    goToNextPage: (state) => {
      if (state.state.page < state.state.pages) {
        state.state.page += 1;
        state.state.loading = true;
      }
    },
    goToLastPage: (state) => {
      if (state.state.page < state.state.pages) {
        state.state.page = state.state.pages;
        state.state.loading = true;
      }
    },
    goToPrevPage: (state) => {
      if (state.state.page > 1) {
        state.state.page -= 1;
        state.state.loading = true;
      }
    },
    goToFirstPage: (state) => {
      if (state.state.page > 1) {
        state.state.page = 1;
        state.state.loading = true;
      }
    },
    createDetailPage: (state, action) => {
      state.state.modalDoc = state.docs.find((item) => item._id === action.payload) || null;
    },
    removeTimer: (state) => {
      const { timer } = state.state;
      if (timer) clearTimeout(timer);
    },
    setNewTimer: (state, action) => {
      state.state.timer = action.payload;
    },
  },
});

export const {
  addNames,
  addCharacters,
  loadCharactersState,
  changePage,
  enableSearchMode,
  goToNextPage,
  goToPrevPage,
  goToFirstPage,
  goToLastPage,
  enableListMode,
  createDetailPage,
  setSearchParams,
  removeTimer,
  setNewTimer,
} = mainSlice.actions;

export default mainSlice.reducer;
