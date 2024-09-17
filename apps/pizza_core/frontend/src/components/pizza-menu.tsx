import { cn } from '@/lib/utils';
import { ComponentProps, FC } from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Pizza } from '@/lib/schemas';
import { Button } from './ui/button';
import { useOrder } from '@/lib/use-order';

const menu: (Pizza & { name: string })[] = [
  {
    name: 'Pepperoni Feast',
    size: 'Large',
    crust: 'Thin',
    toppings: ['Pepperoni', 'Extra cheese'],
  },
  {
    name: 'Veggie Delight',
    size: 'Medium',
    crust: 'Regular',
    toppings: [
      'Mushrooms',
      'Onions',
      'Green peppers',
      'Black olives',
      'Spinach',
    ],
  },
  {
    name: 'Meat Lovers',
    size: 'Extra Large',
    crust: 'Thick',
    toppings: ['Pepperoni', 'Sausage', 'Bacon'],
  },
  {
    name: 'Hawaiian Classic',
    size: 'Small',
    crust: 'Stuffed',
    toppings: ['Pineapple', 'Bacon'],
  },
  {
    name: 'Supreme',
    size: 'Large',
    crust: 'Regular',
    toppings: [
      'Pepperoni',
      'Sausage',
      'Mushrooms',
      'Onions',
      'Green peppers',
      'Black olives',
    ],
  },
  {
    name: 'Spinach & Cheese',
    size: 'Medium',
    crust: 'Thin',
    toppings: ['Spinach', 'Extra cheese', 'Mushrooms'],
  },
];

export const PizzaMenu: FC<ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const { curPizza } = useOrder();
  if (curPizza) return null;
  return (
    <ScrollArea className="w-full">
      <div
        className={cn('w-max flex items-center gap-2 py-4', className)}
        {...props}
      >
        {menu.map((p, i) => (
          <PizzaMenuCard key={i} pizza={p} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

type PizzaMenuCardProps = ComponentProps<'div'> & {
  pizza: Pizza & { name: string };
};
const PizzaMenuCard: FC<PizzaMenuCardProps> = ({
  pizza,
  className,
  ...props
}) => {
  const { setPizza } = useOrder();
  const onClick = () => {
    setPizza(pizza);
  };
  return (
    <div
      className={cn(
        'p-2 w-64 h-64 flex flex-col items-start justify-center border rounded-md gap-2',
        className,
      )}
      {...props}
    >
      <div className="bg-primary w-full h-full" />
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-xl text-primary font-bold">{pizza.name}</h3>
        <div className="flex gap-2 items-end">
          <div className="text-sm text-muted-foreground text-pretty">
            {pizza.toppings.join(', ')}
          </div>
          <Button onClick={onClick}>Order now</Button>
        </div>
      </div>
    </div>
  );
};
