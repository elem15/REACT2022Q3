import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
store.subscribe(() => console.log(store.getState()));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
