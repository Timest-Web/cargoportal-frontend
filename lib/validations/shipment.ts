import { z } from "zod"

export const shipmentSchema = z.object({
  route: z.enum(["uk-ng", "us-ng", "cn-ng"], { error: "Select a route" }),
  description: z.string().min(3, "Add a short description"),
  weight: z.coerce.number().positive("Enter the package weight"),
  length: z.coerce.number().positive("Enter length"),
  width: z.coerce.number().positive("Enter width"),
  height: z.coerce.number().positive("Enter height"),
  category: z.enum(["electronics", "clothing", "documents", "food", "other"], {
    error: "Select a category",
  }),
  value: z.coerce.number().positive("Enter the declared value"),
  invoiceFile: z.instanceof(File).optional().nullable(),
})

export type ShipmentFormValues = z.infer<typeof shipmentSchema>

export const ROUTES = [
  { value: "uk-ng", label: "UK → Nigeria", eta: "5–7 business days", mode: "air" as const },
  { value: "us-ng", label: "USA → Nigeria", eta: "6–9 business days", mode: "air" as const },
  { value: "cn-ng", label: "China → Nigeria", eta: "18–25 business days", mode: "sea" as const },
] as const

export const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "documents", label: "Documents" },
  { value: "food", label: "Food & perishables" },
  { value: "other", label: "Other" },
] as const

export const ROUTE_RATES: Record<string, { perKg: number; base: number }> = {
  "uk-ng": { perKg: 3200, base: 8000 },
  "us-ng": { perKg: 3800, base: 9500 },
  "cn-ng": { perKg: 1800, base: 6000 },
}


export type ShipmentFormInput = z.input<typeof shipmentSchema>