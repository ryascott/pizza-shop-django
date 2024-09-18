import z from 'zod';

export const sizeSchema = z.enum(['Small', 'Medium', 'Large', 'Extra Large']);
export type PizzaSize = z.infer<typeof sizeSchema>;

export const crustTypeSchema = z.enum(['Regular', 'Thin', 'Thick', 'Stuffed']);
export type CrustType = z.infer<typeof crustTypeSchema>;

export const crustSchema = z.object({
  name: crustTypeSchema,
  price: z.coerce.number(),
});
export type Crust = z.infer<typeof crustSchema>;

export const toppingSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
});
export type Topping = z.infer<typeof toppingSchema>;

export const pizzaSchema = z.object({
  size: sizeSchema,
  crust: crustTypeSchema,
  toppings: z.array(z.string()),
});
export type Pizza = z.infer<typeof pizzaSchema>;

export const customerSchema = z.object({
  name: z.string().min(3, { message: 'Name is too short' }),
  phone: z.string().length(10, { message: 'Invalid phone number' }),
  email: z.string().email(),
});
export type Customer = z.infer<typeof customerSchema>;

export const methodSchema = z.enum(['delivery', 'pickup']);
export type Method = z.infer<typeof methodSchema>;

export const orderSchema = z.object({
  pizzas: z.array(pizzaSchema),
  method: methodSchema,
  customer: customerSchema,
  state: z.enum([
    'pending',
    'making',
    'baking',
    'on_the_way',
    'ready_for_pickup',
    'complete',
  ]),
});
export type Order = z.infer<typeof orderSchema>;
