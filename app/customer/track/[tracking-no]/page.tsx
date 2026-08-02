import PageHeader from "@/components/shared/page-header"
import TrackingHero from "@/components/shipments/tracking-hero"
import VerticalTimeline from "@/components/shared/vertical-timeline"
import PlaceholderCard from "@/components/shared/placeholder-card"
import PackageDetailsCard from "@/components/shipments/package-details-card"
import ShippingChargesCard from "@/components/shipments/shipping-charges-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TIMELINE_STAGES = [
  "Shipment Created",
  "Package Received",
  "In Warehouse",
  "Processing",
  "Assigned to Flight",
  "Departed Origin",
  "In Transit",
  "Arrived Nigeria",
  "Customs Clearance",
  "Cleared",
  "Out for Delivery",
  "Delivered",
]

export default function TrackShipmentPage() {
  // TODO: replace with a real fetch keyed off params.trackingNo
  const currentStageIndex = 6

  const timelineSteps = TIMELINE_STAGES.map((label, i) => ({
    label,
    timestamp: i < currentStageIndex ? "May 20, 2026 · 10:32 AM" : undefined,
  }))

  return (
    <div className="space-y-6">
      <PageHeader title="Track Shipment" description="Live status for your shipment" />

      <TrackingHero trackingNo="UK-2024-000124" status="In Transit" eta="May 22, 2026" />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-2xl xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Shipment timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <VerticalTimeline steps={timelineSteps} currentStepIndex={currentStageIndex} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <PlaceholderCard
            cardTitle="Map view"
            title="Live route map coming soon"
            description="This will show the shipment's current position along its route."
          />
          <PackageDetailsCard
            description="Laptop and accessories"
            weight="2.5 kg"
            dimensions="40 × 30 × 15 cm"
            category="Electronics"
            value="₦450,000"
          />
          <ShippingChargesCard
            freight="₦48,000"
            customs="₦22,500"
            insurance="₦6,750"
            pickupFee="₦2,500"
            total="₦79,750"
          />
        </div>
      </div>
    </div>
  )
}