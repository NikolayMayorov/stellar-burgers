import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { selectIsAuthChecked } from '../../slices/authSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  // const user = useSelector(userDataSelector);
  return children;
};
