import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { selectUserData } from '../../slices/authSlice';
import { TUser } from '@utils-types';
import { useSelector } from 'react-redux';

export const Profile: FC = () => {
  /* TODO: взять переменную из стора */
  const user = useSelector(selectUserData);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  // const isFormChanged =
  //   formValue.name !== user?.name ||
  //   formValue.email !== user?.email ||
  //   !!formValue.password;

  const isFormChanged =
    formValue.name !== user?.name || formValue.email !== user?.email;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleInputChange', e.target.name, e.target.value);

    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
