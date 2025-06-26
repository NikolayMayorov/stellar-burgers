import { ProfileOrdersUI } from '@ui-pages';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectLoading, selectFeeds, getFeeds } from '../../slices/basketSlice';
import { Preloader } from '@ui';
export const ProfileOrders: FC = () => {
  /* TODO: взять переменную из стора */

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const orders = useSelector(selectFeeds);
  useEffect(() => {
    if (!orders.length && !loading) dispatch(getFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
