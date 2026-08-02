import { z } from "zod"

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
})
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>

export const addressSchema = z.object({
  line1: z.string().min(3, "Enter an address"),
  city: z.string().min(2, "Enter a city"),
  state: z.string().min(2, "Enter a state"),
})
export type AddressValues = z.infer<typeof addressSchema>