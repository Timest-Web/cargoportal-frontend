"use client"

import { useFormContext } from "react-hook-form"
import { Plane, Anchor } from "lucide-react"
import { ROUTES, type ShipmentFormValues } from "@/lib/validations/shipment"

export default function RouteSelectStep() {
  const { watch, setValue, formState: { errors } } = useFormContext<ShipmentFormValues>()
  const selected = watch("route")

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-medium">Select route</h3>
        <p className="text-sm text-muted-foreground">Choose where this shipment is coming from.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {ROUTES.map(({ value, label, eta, mode }) => {
          const Icon = mode === "air" ? Plane : Anchor
          const isSelected = selected === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => setValue("route", value, { shouldValidate: true })}
              className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${
                isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">{eta}</span>
            </button>
          )
        })}
      </div>

      {errors.route && <p className="text-sm text-destructive">{errors.route.message}</p>}
    </div>
  )
}