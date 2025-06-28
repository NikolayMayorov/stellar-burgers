import React, { FC } from 'react';
import { useSelector } from '../../services/store';
import { Outlet, Navigate } from 'react-router-dom';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectUserData,
  selectLoading
} from '../../slices/authSlice';
import {
  ForgotPassword,
  Login,
  Profile,
  Register,
  ResetPassword
} from '@pages';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  anonymous?: boolean;
};

export const ProtectedRoute = ({
  children,
  anonymous = false
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const from = location.state?.from || '/';
  const loading = useSelector(selectLoading);
  const redirect = location.state?.redirect || false;

  if (loading) {
    return <Preloader />;
  }

  if (isAuthenticated && !redirect) {
    if (location.pathname === '/login' || location.pathname === '/register') {
      return <Navigate to='/profile' />;
    }
  }

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuthenticated && redirect) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuthenticated) {
    // ...то отправляем его на страницу логин
    return <Navigate to='/login' state={{ from: location, redirect: true }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
};
