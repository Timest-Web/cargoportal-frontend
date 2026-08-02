import PageHeader from "@/components/shared/page-header";
import StatCard from "@/components/shared/stat-card";
import StatusBadge from "@/components/shared/status-badge";
import LinkButton from "@/components/shared/link-button";
import PlaceholderCard from "@/components/shared/placeholder-card";
import QuickActionsCard, {
  type QuickAction,
} from "@/components/shared/quick-actions-card";

import DataTableCard, { DataTableColumn } from "@/components/shared/data-table";

import {
  Package,
  Plane,
  Anchor,
  ArrowUpRight,
  CreditCard,
  MapPin,
  Truck,
  Wallet,
} from "lucide-react";
import RouteIndicator from "@/components/shared/route-indicator";

type RecentShipment = {
  trackingNo: string;
  originCode: string;
  destinationCode: string;
  mode: "air" | "sea";
  progress: number;
  status:
    | "Processing"
    | "In Transit"
    | "In Warehouse"
    | "Delivered"
    | "Pending Payment";
  eta: string;
  amount: string;
};

const recentShipments: RecentShipment[] = [
  {
    trackingNo: "UK-2024-000124",
    originCode: "UK",
    destinationCode: "NG",
    mode: "air",
    progress: 60,
    status: "In Transit",
    eta: "May 22, 2026",
    amount: "₦48,500",
  },
  {
    trackingNo: "USA-2024-000072",
    originCode: "US",
    destinationCode: "NG",
    mode: "air",
    progress: 20,
    status: "Processing",
    eta: "May 26, 2026",
    amount: "₦72,000",
  },
  {
    trackingNo: "CN-2024-000019",
    originCode: "CN",
    destinationCode: "NG",
    mode: "sea",
    progress: 85,
    status: "In Warehouse",
    eta: "May 29, 2026",
    amount: "₦33,200",
  },
  {
    trackingNo: "UK-2024-000118",
    originCode: "UK",
    destinationCode: "NG",
    mode: "air",
    progress: 5,
    status: "Pending Payment",
    eta: "—",
    amount: "₦15,900",
  },
  {
    trackingNo: "USA-2024-000061",
    originCode: "US",
    destinationCode: "NG",
    mode: "air",
    progress: 100,
    status: "Delivered",
    eta: "Delivered",
    amount: "₦54,000",
  },
];

const shipmentColumns: DataTableColumn<RecentShipment>[] = [
  {
    key: "trackingNo",
    header: "Shipment",
    render: (s) => (
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-sm">{s.trackingNo}</span>
      </div>
    ),
  },
  {
    key: "route",
    header: "Route",
    render: (s) => (
      <RouteIndicator
        originCode={s.originCode}
        destinationCode={s.destinationCode}
        progress={s.progress}
        modeIcon={s.mode === "air" ? Plane : Anchor}
        modeLabel={s.mode === "air" ? "Air freight" : "Sea freight"}
      />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (s) => <StatusBadge status={s.status} />,
  },
  {
    key: "eta",
    header: "ETA",
    render: (s) => <span className="text-muted-foreground">{s.eta}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (s) => <span className="tabular-nums">{s.amount}</span>,
  },
];

const quickActions: QuickAction[] = [
  {
    label: "Create Shipment",
    href: "/customer/shipments/new",
    icon: ArrowUpRight,
    variant: "default",
  },
  { label: "Track Shipment", href: "/customer/track", icon: MapPin },
  { label: "Request Pickup", href: "/customer/pickups", icon: Truck },
  { label: "Fund Wallet", href: "/customer/wallet", icon: Wallet },
];

export default function CustomerDashboardPage() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, John"
        description={`Here’s what’s happening with your shipments today • ${today}`}
        right={
          <LinkButton href="/customer/shipments/new" className="rounded-xl">
            Create Shipment <ArrowUpRight className="ml-2 h-4 w-4" />
          </LinkButton>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active Shipments"
          value="3"
          icon={Package}
          tone="info"
          hint="Currently in progress"
        />
        <StatCard
          label="Delivered Shipments"
          value="12"
          icon={Truck}
          tone="success"
          hint="All-time delivered"
        />
        <StatCard
          label="Pending Payments"
          value="2"
          icon={CreditCard}
          tone="warning"
          hint="Invoices awaiting payment"
        />
        <StatCard
          label="Wallet Balance"
          value="₦25,400"
          icon={Wallet}
          tone="wallet"
          hint="Available to pay charges"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <DataTableCard
          className="xl:col-span-2"
          title="Recent Shipments"
          columns={shipmentColumns}
          data={recentShipments}
          rowKey={(s) => s.trackingNo}
          viewAllHref="/customer/shipments"
          footer={
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Tip: use the top search bar to quickly find a tracking number.
              </p>
              <LinkButton
                href="/customer/track"
                variant="outline"
                className="rounded-xl"
              >
                Track shipment <MapPin className="ml-2 h-4 w-4" />
              </LinkButton>
            </div>
          }
        />

        <div className="space-y-4">
          <QuickActionsCard actions={quickActions} />

          <PlaceholderCard
            cardTitle="Live Shipment Map"
            title="Map integration coming next"
            description="This card will show route visualization and current status marker."
            actionHref="/customer/shipments"
            actionLabel="Open shipments"
          />
        </div>
      </div>
    </div>
  );
}
