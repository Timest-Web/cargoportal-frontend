import { z } from "zod"

export const fundWalletSchema = z.object({
  amount: z.coerce.number().positive("Enter an amount"),
  method: z.enum(["card", "bank_transfer", "ussd"], { error: "Select a payment method" }),
})

export type FundWalletValues = z.infer<typeof fundWalletSchema>
export type FundWalletInput = z.input<typeof fundWalletSchema>  