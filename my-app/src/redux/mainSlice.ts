import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { ICharacter, IState } from 'components/Main/Main';
import { Mode } from 'helpers/constants/mode';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import {
  firstCharactersLoad,
  searchCharactersLoad,
  searchCharactersThunk,
  searchNamesThunk,
} from './asyncThunks';

interface IMainState {
  docs: ICharacter[] | [];
  state: IState;
}
interface IErrors {
  errorMessage?: string;
}
const initialState: IMainState = {
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
    order: SortingOrder.ASC,
    sort: SortingValues.DEFAULT,
    gender: GenderType.DEFAULT,
    mode: Mode.LIST,
    modalDoc: null,
    timer: null,
  },
};

export type IAction = PayloadAction<
  unknown,
  string,
  {
    arg: void;
    requestId: string;
    requestStatus: 'rejected';
    aborted: boolean;
    condition: boolean;
  } & (
    | {
        rejectedWithValue: true;
      }
    | ({
        rejectedWithValue: false;
      } & Record<string, unknown>)
  ),
  SerializedError
>;
const errorHandler = (state: IMainState, action: IAction) => {
  const { errorMessage } = action.payload as IErrors;
  state.state.errorMessage = errorMessage;
  state.state.error = true;
  state.state.loading = false;
};
const loaderHandler = (state: IMainState) => {
  state.state.loading = true;
};
const dataHandler = (state: IMainState) => {
  state.state.loading = false;
};
export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addSearchParams: (state, action) => {
      state.state = { ...state.state, ...action.payload };
    },
    addCharacters: (state, action: PayloadAction<ICharacter[]>) => {
      state.state.error = false;
      state.docs = action.payload;
    },
    loadCharactersState: (state, action: PayloadAction<IState>) => {
      state.state = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.state.page = action.payload;
      state.state.loading = true;
    },
    setSearchName: (state, action) => {
      state.state.searchValue = action.payload;
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
  },
  extraReducers(builder) {
    builder
      .addCase(firstCharactersLoad.pending, loaderHandler)
      .addCase(firstCharactersLoad.fulfilled, dataHandler)
      .addCase(firstCharactersLoad.rejected, errorHandler)

      .addCase(searchCharactersLoad.pending, loaderHandler)
      .addCase(searchCharactersLoad.fulfilled, dataHandler)
      .addCase(searchCharactersLoad.rejected, errorHandler)

      .addCase(searchCharactersThunk.pending, loaderHandler)
      .addCase(searchCharactersThunk.fulfilled, dataHandler)
      .addCase(searchCharactersThunk.rejected, errorHandler)

      .addCase(searchNamesThunk.rejected, errorHandler);
  },
});

export const {
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
  addSearchParams,
  setSearchName,
} = mainSlice.actions;

export default mainSlice.reducer;
