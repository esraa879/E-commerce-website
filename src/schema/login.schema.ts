import * as z from 'zod';

export const loginSchema = z.object({
      email: z.email("invalid email"),
      password: z.string().min(6,"max length 20"),
})

export type LoginSchemaType = z.infer<typeof loginSchema>