import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from 'src/models/ingredient';

interface IngredientsState {
  ingredients: Ingredient[];
  loading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fill: (state, action) => {
      state.ingredients = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients
  }
});

export const { selectIngredients } = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
export const { fill, setLoading } = ingredientsSlice.actions;
