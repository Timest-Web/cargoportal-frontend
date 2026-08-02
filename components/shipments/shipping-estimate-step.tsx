"use client"

import { useFormContext } from "react-hook-form"
import { ROUTE_RATES, type ShipmentFormValues } from "@/lib/validations/shipment"

function formatNaira(amount: number) {
  return `₦${Math.round(amount).toLocaleString()}`
}

export default function ShippingEstimateStep() {
  const { watch } = useFormContext<ShipmentFormValues>()
  const { route, weight, value } = watch()

  const rate = ROUTE_RATES[route] ?? ROUTE_RATES["uk-ng"]
  const freight = rate.base + (weight || 0) * rate.perKg
  const customs = (value || 0) * 0.05
  const insurance = (value || 0) * 0.015
  const pickupFee = 2500
  const total = freight + customs + insurance + pickupFee

  const lines = [
    { label: "Freight cost", amount: freight },
    { label: "Customs", amount: customs },
    { label: "Insurance", amount: insurance },
    { label: "Pickup fee", amount: pickupFee },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium">Shipping estimate</h3>
        <p className="text-sm text-muted-foreground">
          Based on the route and package details you entered. Final cost may vary slightly at pickup.
        </p>
      </div>

      <div className="divide-y rounded-xl border">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-muted-foreground">{line.label}</span>
            <span className="tabular-nums">{formatNaira(line.amount)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-muted/40 px-4 py-3 text-sm font-medium">
          <span>Total estimate</span>
          <span className="tabular-nums">{formatNaira(total)}</span>
        </div>
      </div>
    </div>
  )
}