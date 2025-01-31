import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string().min(3, 'Name should be at least 3 characters long'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
});
