"use client"

import { CheckCircle2, Printer, MapPin } from "lucide-react"
import LinkButton from "@/components/shared/link-button"
import { Card, CardContent } from "@/components/ui/card"

type ShipmentSuccessProps = {
  reference: string
}

export default function ShipmentSuccess({ reference }: ShipmentSuccessProps) {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12 text-center">
      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-medium">Shipment created</h2>
        <p className="text-sm text-muted-foreground">Your shipment reference number is</p>
        <p className="font-mono text-xl font-medium">{reference}</p>
      </div>

      <Card className="rounded-2xl text-left">
        <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row">
          <LinkButton href={`/customer/shipments/${reference}/label`} variant="outline" className="flex-1 justify-center rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Print Label
          </LinkButton>
          <LinkButton href={`/customer/track?ref=${reference}`} className="flex-1 justify-center rounded-xl">
            <MapPin className="mr-2 h-4 w-4" /> Track Shipment
          </LinkButton>
        </CardContent>
      </Card>
    </div>
  )
}