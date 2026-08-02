"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Eye, MapPin, FileDown, Plane, Anchor } from "lucide-react"

import PageHeader from "@/components/shared/page-header"
import LinkButton from "@/components/shared/link-button"
import FilterTabs from "@/components/shared/filter-tabs"
import AdvancedSearch, { type AdvancedSearchValue } from "@/components/shared/advanced-search"
import RouteIndicator from "@/components/shared/route-indicator"
import StatusBadge from "@/components/shared/status-badge"
import RowActionsMenu from "@/components/shared/row-actions-menu"
import DataTableCard, { DataTableColumn } from "@/components/shared/data-table"

type Shipment = {
  trackingNo: string
  shipmentType: "Parcel" | "Document" | "Pallet" | "Container"
  originCode: string
  destinationCode: string
  mode: "air" | "sea"
  progress: number
  status: "Processing" | "In Transit" | "In Warehouse" | "Delivered" | "Pending Payment"
  amount: string
  date: string
}

const allShipments: Shipment[] = [
  {
    trackingNo: "UK-2024-000124",
    shipmentType: "Parcel",
    originCode: "UK",
    destinationCode: "NG",
    mode: "air",
    progress: 60,
    status: "In Transit",
    amount: "₦48,500",
    date: "2026-05-10",
  },
  {
    trackingNo: "USA-2024-000072",
    shipmentType: "Document",
    originCode: "US",
    destinationCode: "NG",
    mode: "air",
    progress: 20,
    status: "Processing",
    amount: "₦72,000",
    date: "2026-05-12",
  },
  {
    trackingNo: "CN-2024-000019",
    shipmentType: "Pallet",
    originCode: "CN",
    destinationCode: "NG",
    mode: "sea",
    progress: 85,
    status: "In Warehouse",
    amount: "₦33,200",
    date: "2026-05-08",
  },
  {
    trackingNo: "UK-2024-000118",
    shipmentType: "Parcel",
    originCode: "UK",
    destinationCode: "NG",
    mode: "air",
    progress: 5,
    status: "Pending Payment",
    amount: "₦15,900",
    date: "2026-05-14",
  },
  {
    trackingNo: "USA-2024-000061",
    shipmentType: "Container",
    originCode: "US",
    destinationCode: "NG",
    mode: "air",
    progress: 100,
    status: "Delivered",
    amount: "₦54,000",
    date: "2026-04-28",
  },
]

const filterOptions = [
  { label: "Active", value: "active" },
  { label: "Delivered", value: "delivered" },
  { label: "Processing", value: "processing" },
  { label: "In Transit", value: "in-transit" },
]

function matchesFilter(s: Shipment, filter: string) {
  switch (filter) {
    case "active":
      return s.status !== "Delivered"
    case "delivered":
      return s.status === "Delivered"
    case "processing":
      return s.status === "Processing"
    case "in-transit":
      return s.status === "In Transit"
    default:
      return true
  }
}

export default function MyShipmentsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("active")
  const [search, setSearch] = useState<AdvancedSearchValue>({
    trackingNumber: "",
    route: "",
    date: "",
  })

  const counts = useMemo(
    () => ({
      active: allShipments.filter((s) => matchesFilter(s, "active")).length,
      delivered: allShipments.filter((s) => matchesFilter(s, "delivered")).length,
      processing: allShipments.filter((s) => matchesFilter(s, "processing")).length,
      "in-transit": allShipments.filter((s) => matchesFilter(s, "in-transit")).length,
    }),
    []
  )

  const filtered = useMemo(() => {
    return allShipments.filter((s) => {
      if (!matchesFilter(s, filter)) return false

      if (
        search.trackingNumber &&
        !s.trackingNo.toLowerCase().includes(search.trackingNumber.toLowerCase())
      ) {
        return false
      }

      if (
        search.route &&
        !`${s.originCode} ${s.destinationCode}`.toLowerCase().includes(search.route.toLowerCase())
      ) {
        return false
      }

      if (search.date && s.date !== search.date) return false

      return true
    })
  }, [filter, search])

  const columns: DataTableColumn<Shipment>[] = [
    {
      key: "trackingNo",
      header: "Tracking No",
      render: (s) => <span className="font-mono text-sm">{s.trackingNo}</span>,
    },
    {
      key: "shipmentType",
      header: "Shipment Type",
      render: (s) => <span className="text-muted-foreground">{s.shipmentType}</span>,
    },
    {
      key: "route",
      header: "Route",
      headClassName: "w-[180px]",
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
      key: "amount",
      header: "Amount",
      align: "right",
      render: (s) => <span className="tabular-nums">{s.amount}</span>,
    },
    {
      key: "actions",
      header: "",
      headClassName: "w-10",
      className: "text-right",
      render: (s) => (
        <RowActionsMenu
          actions={[
            {
              label: "View details",
              icon: Eye,
              onSelect: () => router.push(`/customer/track/${s.trackingNo}`),
            },
            {
              label: "Track shipment",
              icon: MapPin,
              onSelect: () => router.push(`/customer/track/${s.trackingNo}`),
            },
            {
              label: "Download invoice",
              icon: FileDown,
              onSelect: () => console.log("invoice", s.trackingNo),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Shipments"
        description="Track and manage all your shipments in one place"
        right={
          <LinkButton href="/customer/shipments/new" className="rounded-xl">
            Create Shipment <ArrowUpRight className="ml-2 h-4 w-4" />
          </LinkButton>
        }
      />

      <div className="flex flex-col gap-4">
        <FilterTabs
          options={filterOptions.map((f) => ({
            ...f,
            count: counts[f.value as keyof typeof counts],
          }))}
          value={filter}
          onChange={setFilter}
        />

        <AdvancedSearch
          value={search}
          onChange={setSearch}
          onReset={() => setSearch({ trackingNumber: "", route: "", date: "" })}
        />
      </div>

      <DataTableCard
        title={`${filtered.length} shipment${filtered.length === 1 ? "" : "s"}`}
        columns={columns}
        data={filtered}
        rowKey={(s) => s.trackingNo}
        onRowClick={(s) => router.push(`/customer/track/${s.trackingNo}`)}
        emptyState="No shipments match your filters."
      />
    </div>
  )
}