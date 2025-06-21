import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
//import { Ingredient } from '../models/ingredient';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | undefined | null;
  currentTab: string | undefined | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
  currentTab: null
};

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    }
  },
  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectLoading: (sliceState) => sliceState.loading,
    selectCurrentTab: (sliceState) => sliceState.currentTab
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        // console.log('Ingredients fetched:', action.payload);
      });
  }
});

export const { selectIngredients, selectLoading, selectCurrentTab } =
  ingredientsSlice.selectors;
export const { setIngredients, setLoading, setTab } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
// export const selectLoading = (state: IngredientsState) => state.loading;
