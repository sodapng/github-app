import { z } from 'zod'

export const UserSchema = z.object({
  username: z
    .string()
    .regex(/^[A-Za-z]/, 'Invalid username')
    .regex(/\w+$/, { message: 'You can use the characters a-z, A-Z, 0-9 and underscore' })
    .min(5)
    .max(32),
  birthdate: z.coerce.date(),
  country: z.string().refine((argument) => argument !== 'Country', 'Required'),
  profilePicture: z.custom<File>((file) => file instanceof File),
  subscribe: z.boolean(),
  sex: z.string(),
})

export type UserCard = z.infer<typeof UserSchema>
