import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi, TLoginData } from '../utils/burger-api';
import {
  TRegisterData
  // TAuthResponse,
  // TServerResponse
} from '../utils/burger-api';
import { TUser } from '@utils-types';

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
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  userData: TUser | null;
  loginUserError: string | null | undefined;
  loginUserRequest: boolean;
  registrationUserError: string | null | undefined;
  registrationRequest: boolean;
}

const initialState: AuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  loginUserError: null,
  loginUserRequest: false,
  registrationUserError: null,
  registrationRequest: false
};

export const registrationUser = createAsyncThunk(
  'auth/registrationUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (registerData: TLoginData) => await loginUserApi(registerData)
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    //registrationUser
    builder
      .addCase(registrationUser.pending, (state) => {
        state.registrationRequest = true;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.registrationRequest = false;
        state.registrationUserError = action.error.message;
        console.error(
          'state.registrationUserError:',
          state?.registrationUserError
        );
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        console.log('registrationUser fetched:', action.payload);
        state.registrationRequest = false;
        if (action.payload?.success) {
          state.registrationUserError = null;
          state.isAuthenticated = true;
          state.userData = action.payload.user;
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      });
    //loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('loginUser fetched:', action.payload);
        state.loginUserRequest = false;
        if (action.payload?.success) {
          state.loginUserError = null;
          state.isAuthenticated = true;
          state.userData = action.payload.user;
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      });
  },
  selectors: {
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectRegistrationUserError: (state) => state.registrationUserError,
    selectRegistrationRequest: (state) => state.registrationRequest,
    selectLoginUserError: (state) => state.loginUserError,
    selectLoginUserRequest: (state) => state.loginUserRequest,
    selectUserData: (state) => state.userData
  }
});

export const { setAuthChecked } = authSlice.actions;
export const {
  selectIsAuthChecked,
  selectRegistrationUserError,
  selectRegistrationRequest,
  selectLoginUserError,
  selectLoginUserRequest,
  selectIsAuthenticated,
  selectUserData
} = authSlice.selectors;
export default authSlice.reducer;
