import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState } from 'src/services/store';
import { useDispatch, useSelector } from '../../services/store';
import {
  orderBurger,
  selectBasketBun,
  selectBasketIngredients,
  selectOrderRequest,
  selectOrder,
  clearOrder
} from '../../slices/basketSlice';
import { selectIsAuthenticated } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /* TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const constructorItems = {
    bun: useSelector(selectBasketBun),
    ingredients: useSelector(selectBasketIngredients)
  };

  const orderRequest = useSelector(selectOrderRequest);

  const dispatch = useDispatch();

  const orderModalData = useSelector(selectOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
