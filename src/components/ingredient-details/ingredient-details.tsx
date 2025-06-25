import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { selectIngredients } from '../../slices/ingredientsSlice';
import { RootState } from 'src/services/store';
import { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /* TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  if (id && ingredients.length > 0) {
    const ingredient = ingredients.find((item) => item._id === id);
    if (ingredient) {
      return <IngredientDetailsUI ingredientData={ingredient} />;
    }
  }

  return <Preloader />;
};
