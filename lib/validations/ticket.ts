import { z } from "zod"

export const ticketSchema = z.object({
  subject: z.string().min(3, "Enter a subject"),
  category: z.enum(["shipment", "payment", "account", "other"], { error: "Select a category" }),
  description: z.string().min(10, "Describe your issue in a bit more detail"),
})

export type TicketFormValues = z.infer<typeof ticketSchema>
export type TicketFormInput = z.input<typeof ticketSchema>