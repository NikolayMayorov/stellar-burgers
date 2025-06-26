import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectBasketIngredients,
  selectBasketBun,
  selectOrdersHistory,
  selectLoading,
  selectOrderHistory,
  historyOrders,
  orderByNumber,
  selectFeeds,
  getFeeds
} from '../../slices/basketSlice';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  /* TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const orders = useSelector(selectFeeds);
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (!orders.length && !isLoading) dispatch(getFeeds());
  }, [dispatch, orders.length, isLoading]);
  const orderData = useMemo(() => {
    const foundOrder = orders.find((o) => o.number === Number(number));
    return foundOrder;
  }, [number, orders]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients, orders]);

  if (!orderInfo || isLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
