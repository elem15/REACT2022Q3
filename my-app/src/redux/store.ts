import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import mainReducer from './slices/mainSlice';
import namesReducer from './slices/namesSlice';
import charactersSlice from './slices/charactersSlice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    main: mainReducer,
    names: namesReducer,
    characters: charactersSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
