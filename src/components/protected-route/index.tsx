import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectUserData } from '../../slices/authSlice';
import { Login } from '@pages';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(selectUserData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated || !user) {
    return <Login />;
  }

  return children;
};
