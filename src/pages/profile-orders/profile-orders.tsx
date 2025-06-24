import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectOrdersHistory,
  historyOrders,
  selectLoading
} from '../../slices/basketSlice';
import { Preloader } from '@ui';
export const ProfileOrders: FC = () => {
  /* TODO: взять переменную из стора */

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const orders = useSelector(selectOrdersHistory);
  useEffect(() => {
    dispatch(historyOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
