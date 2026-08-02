import { Card, CardContent } from "@/components/ui/card"
import StatusBadge from "@/components/shared/status-badge"

type TrackingHeroProps = {
  trackingNo: string
  status: "Processing" | "In Transit" | "In Warehouse" | "Delivered" | "Pending Payment"
  eta: string
}

export default function TrackingHero({ trackingNo, status, eta }: TrackingHeroProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Tracking number</p>
          <p className="font-mono text-2xl font-medium">{trackingNo}</p>
        </div>

        <div className="flex flex-col gap-1 sm:items-center">
          <p className="text-xs text-muted-foreground">Current status</p>
          <StatusBadge status={status} />
        </div>

        <div className="flex flex-col gap-1 sm:items-end">
          <p className="text-xs text-muted-foreground">Estimated arrival</p>
          <p className="text-lg font-medium">{eta}</p>
        </div>
      </CardContent>
    </Card>
  )
}