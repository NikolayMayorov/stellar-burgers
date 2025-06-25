import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { selectUserData, updateUser } from '../../slices/authSlice';
import { TUser } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
export const Profile: FC = () => {
  /* TODO: взять переменную из стора */
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
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
    console.log('handleSubmit', formValue);
    dispatch(updateUser(formValue));
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
