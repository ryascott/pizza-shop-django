import { useCrusts, useToppings } from './api';
import { Pizza } from './schemas';

const sizeMods = {
  Small: 0.8,
  Medium: 1,
  Large: 1.2,
  'Extra Large': 1.4,
};

export const usePizzaPrice = () => {
  const { data: toppings } = useToppings();
  const { data: crusts } = useCrusts();
  const getPizzaPrice = (pizza: Pizza): number => {
    const basePrice = 5;
    const toppingsTotal = toppings
      ? pizza.toppings.reduce((prev, cur) => {
          return prev + toppings.find((t) => t.name === cur)!.price;
        }, 0)
      : 0;
    const crustTotal = crusts
      ? crusts.find((c) => c.name === pizza.crust)!.price
      : 0;
    const sizeModifier = sizeMods[pizza.size];
    return (
      Math.round(
        (basePrice + toppingsTotal + crustTotal) * sizeModifier * 100,
      ) / 100
    );
  };
  const getTotal = (pizzas: Pizza[]) => {
    return pizzas.reduce((prev, cur) => prev + getPizzaPrice(cur), 0);
  };
  return { getPizzaPrice, getTotal };
};
