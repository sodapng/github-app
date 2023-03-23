import { z } from 'zod'

export const UserSchema = z.object({
  username: z.string().min(3).max(20),
  birthdate: z.coerce.date(),
  country: z.string(),
  profilePicture: z.custom<File>((file) => file instanceof File),
  subscribe: z.boolean(),
  sex: z.enum(['Male', 'Female']),
})

export type UserCard = z.infer<typeof UserSchema>
