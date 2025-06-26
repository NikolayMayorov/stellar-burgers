import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { selectFeeds } from '../../slices/basketSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);
const totalCount = (orders: TOrder[]) => {
  const todayISO = new Date().toISOString().slice(0, 10);
  let total = 0;
  let totalToday = 0;
  for (const o of orders) {
    total++;
    if (o.createdAt.startsWith(todayISO)) totalToday++;
  }
  return { total, totalToday };
};
export const FeedInfo: FC = () => {
  /* TODO: взять переменные из стора */

  const orders: TOrder[] = useSelector(selectFeeds);
  const feed = totalCount(orders);
  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
