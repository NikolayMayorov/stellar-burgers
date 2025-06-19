import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
// import { RootState } from '../../store';
// import { Role } from '../../types';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <Outlet />
);
