import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registrationUser } from '../../slices/authSlice';
import { TRegisterData } from '@api';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectRegistrationUserError,
  selectRegistrationRequest
} from '../../slices/authSlice';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const registrationError = useSelector(selectRegistrationUserError);
  const registrationRequest = useSelector(selectRegistrationRequest);

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

  if (registrationRequest) {
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
