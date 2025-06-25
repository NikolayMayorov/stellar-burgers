import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi,
  getFeedsApi
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
  feeds: TOrder[];
}

const initialState: BasketState = {
  bun: null,
  ingredients: [],
  requestError: null,
  orderRequest: false,
  loading: false,
  order: null,
  ordersHistory: [],
  orderHistory: null,
  feeds: []
};

export const orderBurger = createAsyncThunk(
  'basket/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getFeeds = createAsyncThunk(
  'basket/getFeeds',
  async () => await getFeedsApi()
);

export const historyOrders = createAsyncThunk(
  'basket/historyOrders',
  async () => await getOrdersApi()
);

export const orderByNumber = createAsyncThunk(
  'auth/loginUser',
  async (id: number) => await getOrderByNumberApi(id)
);

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients = state.ingredients.concat(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
    },
    setBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (state.bun && action.payload.id === state.bun._id) {
          return;
        }
        state.bun = action.payload;
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
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
          state.ingredients = [];
          state.bun = null;
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
    //getFeeds
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.requestError = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.requestError = null;
        if (action.payload.success) {
          state.feeds = action.payload.orders;
        }
      });
    //orderByNumber
    builder
      .addCase(orderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.requestError = action.error.message;
      })
      .addCase(orderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.requestError = null;
        if (action.payload.success) {
          console.log('orderByNumber', action.payload);
          if (action.payload.orders?.length === 0) {
            state.orderHistory = null;
          } else if (action.payload.orders?.length > 0) {
            state.orderHistory = action.payload.orders[0];
          }
        }
      });
  },
  selectors: {
    selectBasketBun: (state) => state.bun,
    selectBasketIngredients: (state) => state.ingredients,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrder: (state) => state.order,
    selectOrdersHistory: (state) => state.ordersHistory,
    selectLoading: (state) => state.loading,
    selectOrderHistory: (state) => state.orderHistory,
    selectFeeds: (state) => state.feeds
  }
});

// const basketSliceArch = createSlice({
//   name: 'basket',
//   initialState,
//   reducers: {
//     addIngredient: (state, action) => {
//       state.ingredients = state.ingredients.concat(action.payload);
//     },

//     setBun: (state, action) => {
//       if (state.bun && action.payload.id === state.bun._id) {
//         return;
//       }
//       state.bun = action.payload;
//     },

//     removeIngredient: (state, action) => {
//       state.ingredients = state.ingredients.filter(
//         (ingredient, itemIndex) => itemIndex !== action.payload
//       );
//     },
//     moveUpIngredient: (state, action) => {
//       const index = action.payload;
//       if (index > 0) {
//         const ingredient = state.ingredients[index];
//         state.ingredients.splice(index, 1);
//         state.ingredients.splice(index - 1, 0, ingredient);
//       }
//     },
//     moveDownIngredient: (state, action) => {
//       const index = action.payload;
//       if (index < state.ingredients.length - 1) {
//         const ingredient = state.ingredients[index];
//         state.ingredients.splice(index, 1);
//         state.ingredients.splice(index + 1, 0, ingredient);
//       }
//     },
//     clearOrder: (state) => {
//       state.order = null;
//     },
//     getOrderByNumber: (state, action) => {
//       state.orderHistory =
//         state.ordersHistory.find((order) => order.number === action.payload) ||
//         null;
//     }
//   },
//   extraReducers: (builder) => {
//     //orderBurger
//     builder
//       .addCase(orderBurger.pending, (state) => {
//         state.orderRequest = true;
//       })
//       .addCase(orderBurger.rejected, (state, action) => {
//         state.orderRequest = false;
//         state.requestError = action.error.message;
//       })
//       .addCase(orderBurger.fulfilled, (state, action) => {
//         state.orderRequest = false;
//         if (action.payload?.success) {
//           state.requestError = null;
//           state.order = action.payload.order;
//         }
//       });
//     //historyOrders
//     builder
//       .addCase(historyOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(historyOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.requestError = action.error.message;
//       })
//       .addCase(historyOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.requestError = null;
//         if (action.payload) {
//           state.ordersHistory = action.payload;
//         }
//       });
//     // //orderByNumber
//     // builder
//     //   .addCase(orderByNumber.pending, (state) => {
//     //     state.loading = true;
//     //   })
//     //   .addCase(orderByNumber.rejected, (state, action) => {
//     //     state.loading = false;
//     //     state.requestError = action.error.message;
//     //   })
//     //   .addCase(orderByNumber.fulfilled, (state, action) => {
//     //     state.loading = false;
//     //     state.requestError = null;
//     //     if (action.payload.success) {
//     //       state.orderHistory = action.payload.orders[0] || null;
//     //     }
//     //   });
//   },
//   selectors: {
//     selectBasketBun: (state) => state.bun,
//     selectBasketIngredients: (state) => state.ingredients,
//     selectOrderRequest: (state) => state.orderRequest,
//     selectOrder: (state) => state.order,
//     selectOrdersHistory: (state) => state.ordersHistory,
//     selectLoading: (state) => state.loading,
//     selectOrderHistory: (state) => state.orderHistory
//   }
// });

export const {
  selectBasketBun,
  selectBasketIngredients,
  selectOrderRequest,
  selectOrder,
  selectOrdersHistory,
  selectLoading,
  selectOrderHistory,
  selectFeeds
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
