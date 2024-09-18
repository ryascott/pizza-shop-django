import { ComponentProps, FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { CookieIcon } from '@radix-ui/react-icons';
import { useOrder } from '@/lib/use-order';
import { CrustType } from '@/lib/schemas';

export const CrustCard: FC<ComponentProps<'div'>> = (props) => {
  const { curPizza, setPizza } = useOrder();
  if (!curPizza) return null;
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Crust</CardTitle>
        <CardDescription>Choose your favorite crust</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="w-full flex items-center justify-center">
          <CookieIcon className="w-16 h-16 text-primary" />
        </div>
        <ToggleGroup
          type="single"
          value={curPizza.crust}
          onValueChange={(value) =>
            setPizza((oldPizza) => ({
              ...oldPizza!,
              crust: value as CrustType,
            }))
          }
          className="w-full flex flex-col items-start gap-2"
        >
          <ToggleGroupItem className="text-xl" value="Regular">
            Regular
          </ToggleGroupItem>
          <ToggleGroupItem className="text-xl" value="Thin">
            Thin
          </ToggleGroupItem>
          <ToggleGroupItem className="text-xl" value="Thick">
            Thick
          </ToggleGroupItem>
          <ToggleGroupItem className="text-xl" value="Stuffed">
            Stuffed
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};
