import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectUserData } from '../../slices/authSlice';
import {
  ForgotPassword,
  Login,
  Profile,
  Register,
  ResetPassword
} from '@pages';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(selectUserData);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (location.pathname === '/forgot-password') {
    if (!isAuthenticated || !user) {
      return <ForgotPassword />;
    }
  }

  if (location.pathname === '/reset-password') {
    console.log('Reset Password Path');
    if (!isAuthenticated || !user) {
      return <ResetPassword />;
    }
  }

  if (location.pathname === '/forgot-password') {
    if (!isAuthenticated || !user) {
      return <ForgotPassword />;
    }
  }

  if (!isAuthenticated || !user) {
    return <Login />;
  }

  return children;
};
