import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectLoginUserError,
  selectLoginUserRequest,
  loginUser,
  selectIsAuthenticated
} from '../../slices/authSlice';
import { Preloader } from '@ui';
import { TLoginData } from '@api';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loginUserError = useSelector(selectLoginUserError);
  const loginUserRequest = useSelector(selectLoginUserRequest);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    const loginData: TLoginData = {
      email: email,
      password: password
    };
    dispatch(loginUser(loginData));
  };

  if (loginUserRequest) {
    return <Preloader />;
  }

  if (isAuthenticated) {
    return <Navigate to={'/profile'} />;
  }

  return (
    <LoginUI
      errorText={loginUserError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
