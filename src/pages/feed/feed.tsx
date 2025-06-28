import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectLoading, selectFeeds, getFeeds } from '../../slices/basketSlice';

export const Feed: FC = () => {
  /* TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectFeeds);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const handlerGetFeeds = useCallback(() => {
    dispatch(getFeeds());
  }, [dispatch, orders.length]);

  useEffect(() => {
    handlerGetFeeds();
  }, [dispatch, handlerGetFeeds]);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handlerGetFeeds} />;
};
