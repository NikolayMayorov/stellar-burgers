import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../utils/burger-api';

interface BasketState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  requestError: string | null | undefined;
  orderRequest: boolean;
  loading: boolean;
  order: TOrder | null;
  ordersHistory: TOrder[];
  orderHistory: TOrder | null;
}

const initialState: BasketState = {
  bun: null,
  ingredients: [],
  requestError: null,
  orderRequest: false,
  loading: false,
  order: null,
  ordersHistory: [],
  orderHistory: null
};

export const orderBurger = createAsyncThunk(
  'basket/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const historyOrders = createAsyncThunk(
  'basket/historyOrders',
  async () => await getOrdersApi()
);

// export const orderByNumber = createAsyncThunk(
//   'auth/loginUser',
//   async (id: number) => await getOrderByNumberApi(id)
// );

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
    },
    clearOrder: (state) => {
      state.order = null;
    },
    getOrderByNumber: (state, action) => {
      state.orderHistory =
        state.ordersHistory.find((order) => order.number === action.payload) ||
        null;
    }
  },
  extraReducers: (builder) => {
    //orderBurger
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.requestError = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        if (action.payload?.success) {
          state.requestError = null;
          state.order = action.payload.order;
        }
      });
    //historyOrders
    builder
      .addCase(historyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(historyOrders.rejected, (state, action) => {
        state.loading = false;
        state.requestError = action.error.message;
      })
      .addCase(historyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.requestError = null;
        if (action.payload) {
          state.ordersHistory = action.payload;
        }
      });
    // //orderByNumber
    // builder
    //   .addCase(orderByNumber.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(orderByNumber.rejected, (state, action) => {
    //     state.loading = false;
    //     state.requestError = action.error.message;
    //   })
    //   .addCase(orderByNumber.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.requestError = null;
    //     if (action.payload.success) {
    //       state.orderHistory = action.payload.orders[0] || null;
    //     }
    //   });
  },
  selectors: {
    selectBasketBun: (state) => state.bun,
    selectBasketIngredients: (state) => state.ingredients,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrder: (state) => state.order,
    selectOrdersHistory: (state) => state.ordersHistory,
    selectLoading: (state) => state.loading,
    selectOrderHistory: (state) => state.orderHistory
  }
});

export const {
  selectBasketBun,
  selectBasketIngredients,
  selectOrderRequest,
  selectOrder,
  selectOrdersHistory,
  selectLoading,
  selectOrderHistory
} = basketSlice.selectors;

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder,
  getOrderByNumber
} = basketSlice.actions;

export default basketSlice.reducer;
// export const selectLoading = (state: IngredientsState) => state.loading;
