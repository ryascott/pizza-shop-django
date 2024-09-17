import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { Crust, crustSchema, Topping, toppingSchema } from './schemas';

const API_URL = 'http://localhost:8000/api';

type Endpoint = '/toppings' | '/crusts';

export const apiUrl = (
  endpointPath: Endpoint,
  params?: string[],
  query?: Record<string, string>,
): string => {
  return (
    `${API_URL}${endpointPath}/` +
    (params ? params.join('/') : '') +
    (query
      ? '?' +
        Object.entries(query)
          .map((entry) => entry.join('='))
          .join('&')
      : '')
  );
};

const makeResponseListSchema = <T extends z.ZodTypeAny>(itemSchema: T) => {
  return z.object({
    next: z.nullable(z.string().url()),
    previous: z.nullable(z.string().url()),
    results: z.array(itemSchema),
  });
};

export const useToppings = () =>
  useQuery({
    queryKey: ['toppings'],
    queryFn: async (): Promise<Topping[]> => {
      const res = await fetch(apiUrl('/toppings'));
      return makeResponseListSchema(toppingSchema).parse(await res.json())
        .results;
    },
  });

export const useCrusts = () =>
  useQuery({
    queryKey: ['crusts'],
    queryFn: async (): Promise<Crust[]> => {
      const res = await fetch(apiUrl('/crusts'));
      return makeResponseListSchema(crustSchema).parse(await res.json())
        .results;
    },
  });
