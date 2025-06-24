import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registrationUser } from '../../slices/authSlice';
import { TRegisterData } from '@api';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectRegistrationUserError,
  selectLoading
} from '../../slices/authSlice';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const registrationError = useSelector(selectRegistrationUserError);
  const loading = useSelector(selectLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const registerData: TRegisterData = {
      email: email,
      password: password,
      name: userName
    };
    console.log('registerData', registerData);
    dispatch(registrationUser(registerData));
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={registrationError || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
