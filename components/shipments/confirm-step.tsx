"use client"

import { useFormContext } from "react-hook-form"
import { Pencil } from "lucide-react"
import { ROUTES, type ShipmentFormValues } from "@/lib/validations/shipment"

type ConfirmStepProps = {
  onEditStep: (step: number) => void
}

export default function ConfirmStep({ onEditStep }: ConfirmStepProps) {
  const { watch } = useFormContext<ShipmentFormValues>()
  const values = watch()
  const routeLabel = ROUTES.find((r) => r.value === values.route)?.label ?? "—"

  const rows = [
    { label: "Route", value: routeLabel, step: 0 },
    { label: "Description", value: values.description, step: 1 },
    { label: "Weight", value: `${values.weight} kg`, step: 1 },
    { label: "Dimensions", value: `${values.length} × ${values.width} × ${values.height} cm`, step: 1 },
    { label: "Category", value: values.category, step: 1 },
    { label: "Declared value", value: `₦${values.value?.toLocaleString()}`, step: 1 },
    { label: "Invoice", value: values.invoiceFile?.name ?? "Not attached", step: 2 },
  ]

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-medium">Confirm shipment</h3>
        <p className="text-sm text-muted-foreground">Review everything before you submit.</p>
      </div>

      <div className="divide-y rounded-xl border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <p className="text-muted-foreground">{row.label}</p>
              <p className="font-medium">{row.value}</p>
            </div>
            <button type="button" onClick={() => onEditStep(row.step)} className="text-muted-foreground hover:text-foreground">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}