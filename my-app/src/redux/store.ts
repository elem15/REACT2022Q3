import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import mainReducer from './mainSlice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    main: mainReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
