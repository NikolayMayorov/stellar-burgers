import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import basketReducer from '../slices/basketSlice';
import authReducer from '../slices/authSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// const rootReducer = () => {
//   ingredients: ingredientsReducer;
// }; // Заменить на импорт настоящего редьюсера

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  basket: basketReducer,
  auth: authReducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
