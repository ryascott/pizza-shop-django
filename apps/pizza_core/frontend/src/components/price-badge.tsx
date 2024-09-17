import { Pizza } from '@/lib/schemas';
import { FC } from 'react';
import { Badge } from './ui/badge';
import { usePizzaPrice } from '@/lib/use-pizza-price';

type PriceBadgeProps = {
  pizza: Pizza;
};

export const PriceBadge: FC<PriceBadgeProps> = ({ pizza }) => {
  const { getPizzaPrice } = usePizzaPrice();
  return (
    <Badge className="hover:bg-primary absolute text-sm right-0 bottom-0 -translate-x-2 translate-y-3 rounded-full">
      ${getPizzaPrice(pizza).toFixed(2)}
    </Badge>
  );
};
