import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ShipmentStatus } from "@/lib/mock/owner";

const map: Record<string, string> = {
  // shipments
  "Shipment Created": "bg-muted text-muted-foreground",
  "Package Received": "bg-info/10 text-info",
  "Warehouse Check-In": "bg-info/10 text-info",
  Processing: "bg-warning/15 text-warning-foreground",
  Consolidated: "bg-warning/15 text-warning-foreground",
  "In Transit": "bg-wallet/10 text-wallet",
  "Arrived Nigeria": "bg-info/10 text-info",
  "Customs Clearance": "bg-warning/15 text-warning-foreground",
  Cleared: "bg-primary/10 text-primary",
  "Out For Delivery": "bg-wallet/10 text-wallet",
  Delivered: "bg-primary/10 text-primary",
  // generic
  Verified: "bg-primary/10 text-primary",
  Pending: "bg-warning/15 text-warning-foreground",
  Rejected: "bg-destructive/10 text-destructive",
  Suspended: "bg-destructive/10 text-destructive",
  Paid: "bg-primary/10 text-primary",
  Overdue: "bg-destructive/10 text-destructive",
  "Part paid": "bg-info/10 text-info",
  Active: "bg-primary/10 text-primary",
  Inactive: "bg-muted text-muted-foreground",
  Unpaid: "bg-warning/15 text-warning-foreground",
};

export function OwnerStatusBadge({ status }: { status: ShipmentStatus | string }) {
  return (
    <Badge variant="secondary" className={cn("border-0 font-medium", map[status] ?? "")}>
      {status}
    </Badge>
  );
}