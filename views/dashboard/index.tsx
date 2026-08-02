import PageHeader from "@/components/shared/page-header";
import StatCard from "@/components/shared/stat-card";
import StatusBadge from "@/components/shared/status-badge";
import LinkButton from "@/components/shared/link-button";
import PlaceholderCard from "@/components/shared/placeholder-card";
import QuickActionsCard, {
  type QuickAction,
} from "@/components/shared/quick-actions-card";

import {
  ArrowUpRight,
  CreditCard,
  MapPin,
  Package,
  Truck,
  Wallet,
} from "lucide-react";
import DataTableCard, { DataTableColumn } from "@/components/shared/data-table";

type RecentShipment = {
  trackingNo: string;
  route: "UK → Nigeria" | "USA → Nigeria" | "China → Nigeria";
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
    route: "UK → Nigeria",
    status: "In Transit",
    eta: "May 22, 2026",
    amount: "₦48,500",
  },
  {
    trackingNo: "USA-2024-000072",
    route: "USA → Nigeria",
    status: "Processing",
    eta: "May 26, 2026",
    amount: "₦72,000",
  },
  {
    trackingNo: "CN-2024-000019",
    route: "China → Nigeria",
    status: "In Warehouse",
    eta: "May 29, 2026",
    amount: "₦33,200",
  },
  {
    trackingNo: "UK-2024-000118",
    route: "UK → Nigeria",
    status: "Pending Payment",
    eta: "—",
    amount: "₦15,900",
  },
  {
    trackingNo: "USA-2024-000061",
    route: "USA → Nigeria",
    status: "Delivered",
    eta: "Delivered",
    amount: "₦54,000",
  },
];

const shipmentColumns: DataTableColumn<RecentShipment>[] = [
  {
    key: "trackingNo",
    header: "Tracking No",
    render: (s) => <span className="font-medium">{s.trackingNo}</span>,
  },
  {
    key: "route",
    header: "Route",
    render: (s) => <span className="text-muted-foreground">{s.route}</span>,
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
  { key: "amount", header: "Amount", align: "right", render: (s) => s.amount },
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

export default function CustomerDashboardView() {
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
