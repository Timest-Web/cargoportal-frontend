import { z } from "zod"

export const pickupSchema = z.object({
  address: z.string().min(5, "Enter a pickup address"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  packageCount: z.coerce.number().int().positive("Enter number of packages"),
})


export type PickupFormValues = z.infer<typeof pickupSchema>
export type PickupFormInput = z.input<typeof pickupSchema>