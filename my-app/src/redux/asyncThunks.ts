import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadCharacters, searchCharacters } from 'helpers/controllers/getCharacters';
import { addCharacters } from './slices/charactersSlice';
import { loadCharactersState } from './slices/mainSlice';
import { addNames } from './slices/namesSlice';
import { RootState } from './store';

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
