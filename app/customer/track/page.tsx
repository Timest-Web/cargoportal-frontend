"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Plane, Anchor } from "lucide-react"

import PageHeader from "@/components/shared/page-header"
import FilterTabs from "@/components/shared/filter-tabs"
import RouteIndicator from "@/components/shared/route-indicator"
import StatusBadge from "@/components/shared/status-badge"
import DataTableCard, { DataTableColumn } from "@/components/shared/data-table"
import QuickSearchBar from "@/components/shared/quick-search-bar"

type Shipment = {
  trackingNo: string
  originCode: string
  destinationCode: string
  mode: "air" | "sea"
  progress: number
  status: "Processing" | "In Transit" | "In Warehouse" | "Delivered" | "Pending Payment"
  eta: string
}

const allShipments: Shipment[] = [
  { trackingNo: "UK-2024-000124", originCode: "UK", destinationCode: "NG", mode: "air", progress: 60, status: "In Transit", eta: "May 22, 2026" },
  { trackingNo: "USA-2024-000072", originCode: "US", destinationCode: "NG", mode: "air", progress: 20, status: "Processing", eta: "May 26, 2026" },
  { trackingNo: "CN-2024-000019", originCode: "CN", destinationCode: "NG", mode: "sea", progress: 85, status: "In Warehouse", eta: "May 29, 2026" },
  { trackingNo: "UK-2024-000118", originCode: "UK", destinationCode: "NG", mode: "air", progress: 5, status: "Pending Payment", eta: "—" },
  { trackingNo: "USA-2024-000061", originCode: "US", destinationCode: "NG", mode: "air", progress: 100, status: "Delivered", eta: "Delivered" },
]

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Delivered", value: "delivered" },
]

function matchesFilter(s: Shipment, filter: string) {
  if (filter === "active") return s.status !== "Delivered"
  if (filter === "delivered") return s.status === "Delivered"
  return true
}

export default function TrackShipmentPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")

  const counts = useMemo(
    () => ({
      all: allShipments.length,
      active: allShipments.filter((s) => matchesFilter(s, "active")).length,
      delivered: allShipments.filter((s) => matchesFilter(s, "delivered")).length,
    }),
    []
  )

  const filtered = useMemo(() => {
    return allShipments.filter((s) => {
      if (!matchesFilter(s, filter)) return false
      if (!query) return true

      const q = query.toLowerCase()
      return (
        s.trackingNo.toLowerCase().includes(q) ||
        s.originCode.toLowerCase().includes(q) ||
        s.destinationCode.toLowerCase().includes(q)
      )
    })
  }, [filter, query])

  const columns: DataTableColumn<Shipment>[] = [
    { key: "trackingNo", header: "Tracking No", render: (s) => <span className="font-mono text-sm">{s.trackingNo}</span> },
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
    { key: "status", header: "Status", render: (s) => <StatusBadge status={s.status} /> },
    { key: "eta", header: "ETA", render: (s) => <span className="text-muted-foreground">{s.eta}</span> },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Track Shipment" description="Search by tracking number or route, or pick from the list below" />

      <QuickSearchBar
        placeholder="Search tracking number or route (e.g. UK-2024-000124, US to NG)"
        buttonLabel="Search"
        onSubmit={(value) => setQuery(value)}
      />

      <FilterTabs
        options={filterOptions.map((f) => ({ ...f, count: counts[f.value as keyof typeof counts] }))}
        value={filter}
        onChange={setFilter}
      />

      <DataTableCard
        title={`${filtered.length} shipment${filtered.length === 1 ? "" : "s"}`}
        columns={columns}
        data={filtered}
        rowKey={(s) => s.trackingNo}
        onRowClick={(s) => router.push(`/customer/track/${s.trackingNo}`)}
        emptyState={query ? `No shipments match "${query}"` : "No shipments found."}
      />
    </div>
  )
}