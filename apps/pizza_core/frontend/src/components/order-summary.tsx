import { useOrder } from '@/lib/use-order';
import { ComponentProps, FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Pizza } from '@/lib/schemas';
import { CustomerForm } from './customer-form';
import { TransparencyGridIcon } from '@radix-ui/react-icons';
import { Separator } from './ui/separator';
import { PriceBadge } from './price-badge';
import { usePizzaPrice } from '@/lib/use-pizza-price';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const OrderSummary: FC = () => {
  const { order } = useOrder();
  const { getTotal } = usePizzaPrice();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative w-full h-full border rounded-xl shadow bg-card flex flex-col justify-center gap-2 p-4">
        <h2 className="text-xl font-medium">Your order</h2>
        {!order.pizzas || order.pizzas.length == 0 ? (
          <>
            <TransparencyGridIcon className="text-primary/50 w-full h-full" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 text-muted-foreground">
              Nothing here yet...
            </span>
          </>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="w-full h-full flex flex-col gap-12">
              {order.pizzas?.map((p, i) => (
                <PizzaSummary key={i} pizzaIndex={i} pizza={p} />
              ))}
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              {order.method === 'delivery' && (
                <p className="text-muted-foreground">delivery fee - $3</p>
              )}
              <Badge className="text-xl hover:bg-primary rounded-2xl px-4 py-1">
                Total $
                {(
                  getTotal(order.pizzas) +
                  (order.method! === 'delivery' ? 3 : 0)
                ).toFixed(2)}
              </Badge>
            </div>
          </div>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your details</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerForm />
        </CardContent>
      </Card>
    </section>
  );
};

type PizzaSummaryProps = ComponentProps<'div'> & {
  pizza: Pizza;
  pizzaIndex: number;
};

const PizzaSummary: FC<PizzaSummaryProps> = ({ pizza, pizzaIndex }) => {
  const { setOrder, setPizza } = useOrder();
  const remove = () => {
    setOrder((order) => {
      const newPizzas = order.pizzas;
      newPizzas!.splice(pizzaIndex, 1);
      return { ...order, pizzas: newPizzas };
    });
  };
  const edit = () => {
    remove();
    setPizza(pizza);
  };
  return (
    <div className="relative w-full rounded-xl p-2 pt-5 flex items-center gap-6 border-2 border-t-primary border-t-4">
      <div className="flex flex-col items-start min-w-fit">
        <p>
          <span className="text-muted-foreground font-light">size: </span>
          {pizza.size}
        </p>
        <p>
          <span className="text-muted-foreground font-light">crust: </span>
          {pizza.crust}
        </p>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {pizza.toppings.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="absolute top-0 right-0 -translate-x-2 -translate-y-4 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="rounded-lg"
          onClick={edit}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="rounded-lg"
          onClick={remove}
        >
          Remove
        </Button>
      </div>
      <PriceBadge pizza={pizza} />
    </div>
  );
};
