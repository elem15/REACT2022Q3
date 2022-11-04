import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { ICharacter, IName, IState } from 'components/Main/Main';
import { Mode } from 'helpers/constants/mode';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import { loadCharacters, searchCharacters } from 'helpers/controllers/getCharacters';
import { RootState } from './store';

interface IMainState {
  names: IName[];
  docs: ICharacter[] | [];
  state: IState;
}
interface ISearchParams {
  key: keyof IState;
  value: string | number;
}
interface IErrors {
  errorMessage?: string;
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

export const firstCharactersLoad = createAsyncThunk(
  'main/firstCharactersLoad',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const { order, sort, gender, limit, page } = state.main.state;
    const { docs, pages, error, errorMessage, total } = await loadCharacters({
      page,
      order,
      sort,
      gender,
      limit,
      searchValue: '',
    });
    if (error) return rejectWithValue({ errorMessage });
    dispatch(
      loadCharactersState({
        ...state.main.state,
        total,
        pages: pages || state.main.state.pages,
        searchValue: localStorage.getItem('searchValue') || '',
      })
    );
    dispatch(addCharacters(docs));
  }
);
export const searchCharactersLoad = createAsyncThunk(
  'main/searchCharactersLoad',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const { order, sort, gender, limit, page, searchValue } = state.main.state;
    const {
      docs,
      pages,
      error,
      errorMessage,
      mode,
      total,
      page: newPageNumber,
    } = await loadCharacters({
      page,
      order,
      sort,
      gender,
      limit,
      searchValue,
    });
    if (error) return rejectWithValue({ errorMessage });
    dispatch(
      loadCharactersState({
        ...state.main.state,
        page: newPageNumber,
        mode,
        total,
        pages: pages || state.main.state.pages,
        searchValue: localStorage.getItem('searchValue') || '',
      })
    );
    dispatch(addCharacters(docs));
  }
);
export const searchCharactersThunk = createAsyncThunk(
  'main/searchCharactersThunk',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const { searchValue } = state.main.state;
    const { docs, error, mode, errorMessage } = await searchCharacters(searchValue);
    if (error) return rejectWithValue({ errorMessage });
    dispatch(
      loadCharactersState({
        ...state.main.state,
        mode,
        searchValue: '',
      })
    );
    dispatch(addCharacters(docs));
  }
);
const timers = {
  timeout: null as NodeJS.Timeout | null,
};

export const searchNamesThunk = createAsyncThunk(
  'main/searchNamesThunk',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const { searchValue } = state.main.state;
    if (timers.timeout) clearTimeout(timers.timeout);
    timers.timeout = setTimeout(async () => {
      localStorage.setItem('searchValue', searchValue);
      const data = await searchCharacters(searchValue);
      const { error, errorMessage } = data;
      if (error) return rejectWithValue({ errorMessage });
      const names = data.docs.map(({ name, _id }) => ({ name, id: _id }));
      dispatch(addNames(names));
    }, 1000);
  }
);
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
} = mainSlice.actions;

export default mainSlice.reducer;
