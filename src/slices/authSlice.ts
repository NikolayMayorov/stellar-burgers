import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  TLoginData,
  getUserApi,
  logoutApi,
  refreshToken,
  updateUserApi
} from '../utils/burger-api';
import {
  TRegisterData
  // TAuthResponse,
  // TServerResponse
} from '../utils/burger-api';
import { TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';
export type AuthResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

interface AuthState {
  isInit: boolean; //?????
  isAuthenticated: boolean;
  userData: TUser | null;
  loginUserError: string | null | undefined;
  requestError: string | null | undefined;
  loading: boolean;
}

const initialState: AuthState = {
  isInit: false,
  isAuthenticated: false,
  userData: null,
  loginUserError: null,
  requestError: null,
  loading: false
};

export const registrationUser = createAsyncThunk(
  'auth/registrationUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (registerData: TLoginData) => await loginUserApi(registerData)
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async () => await getUserApi()
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => await logoutApi()
);

export const refreshUserToken = createAsyncThunk(
  'auth/refreshUserToken',
  async () => await refreshToken()
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (updateData: TRegisterData) => await updateUserApi(updateData)
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    //registrationUser
    builder
      .addCase(registrationUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.loading = false;
        state.requestError = action.error.message;
        console.error('state.registrationUserError:', state?.requestError);
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        console.log('registrationUser fetched:', action.payload);
        state.loading = false;
        if (action.payload?.success) {
          state.requestError = null;
          state.isAuthenticated = true;
          state.userData = action.payload.user;
          //localStorage.setItem('token', action.payload.accessToken);
          setCookie('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      });
    //loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginUserError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success) {
          state.loginUserError = null;
          state.isAuthenticated = true;
          state.userData = action.payload.user;
          //localStorage.setItem('token', action.payload.accessToken);
          setCookie('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      });
    //getUser
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success) {
          state.loginUserError = null;
          state.isAuthenticated = true;
          state.userData = action.payload.user;
        }
      });
    //logoutUser
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success) {
          state.isAuthenticated = false;
          state.userData = null;
          state.requestError = null;
          state.loginUserError = null;
          //localStorage.removeItem('token');
          setCookie('accessToken', '');
          localStorage.removeItem('refreshToken');
        }
      });
    //refreshUserToken
    builder
      .addCase(refreshUserToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success) {
          state.isAuthenticated = true;
          setCookie('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      });
    //updateUser
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.loginUserError = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log('updateUser fetched:', action.payload);
        if (action.payload?.success) {
          state.loginUserError = null;
          state.isAuthenticated = true;
          state.userData = action.payload.user;
          //localStorage.setItem('email', action.payload.user.email);
        }
      });
  },
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectRegistrationUserError: (state) => state.requestError,
    selectLoginUserError: (state) => state.loginUserError,
    selectUserData: (state) => state.userData,
    selectLoading: (state) => state.loading
  }
});

export const { init } = authSlice.actions;
export const {
  selectRegistrationUserError,
  selectLoginUserError,
  selectIsAuthenticated,
  selectUserData,
  selectLoading
} = authSlice.selectors;
export default authSlice.reducer;
