import { ComponentProps, FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { ColorWheelIcon } from '@radix-ui/react-icons';
import { useOrder } from '@/lib/use-order';
import { PizzaSize } from '@/lib/schemas';
import { cn } from '@/lib/utils';

export const SizeCard: FC<ComponentProps<'div'>> = (props) => {
  const { curPizza, setPizza } = useOrder();
  if (!curPizza) return null;
  const iconSize = {
    Small: 'w-6 h-6',
    Medium: 'w-10 h-10',
    Large: 'w-16 h-16',
    'Extra Large': 'w-32 h-32',
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Size</CardTitle>
        <CardDescription>Choose the size of your pizza</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="w-full flex items-center justify-center">
          <ColorWheelIcon
            className={cn(
              iconSize[curPizza.size],
              'transition-all',
              'text-primary',
            )}
          />
        </div>
        <ToggleGroup
          type="single"
          value={curPizza.size}
          onValueChange={(value) =>
            setPizza((oldPizza) => ({ ...oldPizza!, size: value as PizzaSize }))
          }
          className="w-full flex flex-col items-start gap-2"
        >
          <ToggleGroupItem className="text-xl" value="Small">
            Small
          </ToggleGroupItem>
          <ToggleGroupItem className="text-xl" value="Medium">
            Medium
          </ToggleGroupItem>
          <ToggleGroupItem className="text-xl" value="Large">
            Large
          </ToggleGroupItem>
          <ToggleGroupItem className="text-xl" value="Extra Large">
            Extra Large
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};
