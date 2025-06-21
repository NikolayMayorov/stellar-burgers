import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient, itemIndex) => itemIndex !== action.payload
      );
    },

    moveUpIngredient: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredient);
      }
    },
    moveDownIngredient: (state, action) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredient);
      }
    }
  },
  selectors: {
    selectBasketBun: (state) => state.bun,
    selectBasketIngredients: (state) => state.ingredients
  }
});

export const { selectBasketBun, selectBasketIngredients } =
  basketSlice.selectors;
export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} = basketSlice.actions;

export default basketSlice.reducer;
// export const selectLoading = (state: IngredientsState) => state.loading;
