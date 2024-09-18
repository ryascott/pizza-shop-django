import { FC } from 'react';
import { Button, ButtonProps } from './ui/button';
import { useOrder } from '@/lib/use-order';
import { defaultPizza } from '@/lib/data';

export const CreatePizzaButton: FC<ButtonProps> = (props) => {
  const { curPizza, setPizza } = useOrder();
  if (curPizza) return null;
  const onClick = () => {
    setPizza(defaultPizza);
  };
  return (
    <Button onClick={onClick} {...props}>
      Create your own
    </Button>
  );
};
