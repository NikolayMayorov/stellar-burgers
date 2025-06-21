import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { selectIngredients } from './ingredientsSlice';

interface IngredientsState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: IngredientsState = {
  bun: null,
  ingredients: []
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBun: (state, action) => {
      if (state.bun && action.payload.id === state.bun._id) {
        return;
      }
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients = state.ingredients.concat(action.payload);
    }
  },
  selectors: {
    selectBasketBun: (state) => state.bun,
    selectBasketIngredients: (state) => state.ingredients
  }
});

export const { selectBasketBun, selectBasketIngredients } =
  basketSlice.selectors;
export const { setBun, addIngredient } = basketSlice.actions;

export default basketSlice.reducer;
// export const selectLoading = (state: IngredientsState) => state.loading;
