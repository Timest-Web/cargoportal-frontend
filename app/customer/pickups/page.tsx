"use client"

import { useMemo, useState } from "react"
import PageHeader from "@/components/shared/page-header"
import FilterTabs from "@/components/shared/filter-tabs"
import StatusBadge from "@/components/shared/status-badge"
import type { PickupFormValues } from "@/lib/validations/pickup"
import DataTableCard, { DataTableColumn } from "@/components/shared/data-table"
import CreatePickupDialog from "@/components/pickup/create-pickup-dialog"

type PickupStatus = "Pending" | "Approved" | "Assigned Driver" | "Completed"

type PickupRequest = {
  id: string
  address: string
  date: string
  time: string
  packageCount: number
  status: PickupStatus
  driver?: string
}

const initialRequests: PickupRequest[] = [
  { id: "PU-1042", address: "12 Admiralty Way, Lekki Phase 1, Lagos", date: "2026-08-02", time: "10:00", packageCount: 3, status: "Pending" },
  { id: "PU-1039", address: "5 Allen Avenue, Ikeja, Lagos", date: "2026-08-01", time: "14:00", packageCount: 1, status: "Approved" },
  { id: "PU-1035", address: "8 Ademola Adetokunbo, VI, Lagos", date: "2026-07-30", time: "09:30", packageCount: 5, status: "Assigned Driver", driver: "Chuka O." },
  { id: "PU-1021", address: "22 Awolowo Road, Ikoyi, Lagos", date: "2026-07-25", time: "11:00", packageCount: 2, status: "Completed" },
]

const filterOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Assigned Driver", value: "Assigned Driver" },
  { label: "Completed", value: "Completed" },
]

export default function PickupRequestsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [filter, setFilter] = useState("Pending")

  const counts = useMemo(
    () =>
      filterOptions.reduce((acc, f) => {
        acc[f.value] = requests.filter((r) => r.status === f.value).length
        return acc
      }, {} as Record<string, number>),
    [requests]
  )

  const filtered = requests.filter((r) => r.status === filter)

  function handleCreate(values: PickupFormValues) {
    const newRequest: PickupRequest = {
      id: `PU-${Math.floor(1000 + Math.random() * 9000)}`,
      address: values.address,
      date: values.date,
      time: values.time,
      packageCount: values.packageCount,
      status: "Pending",
    }
    setRequests((prev) => [newRequest, ...prev])
    setFilter("Pending")
  }

  const columns: DataTableColumn<PickupRequest>[] = [
    { key: "id", header: "Request ID", render: (r) => <span className="font-mono text-sm">{r.id}</span> },
    { key: "address", header: "Pickup Address", render: (r) => <span className="text-muted-foreground">{r.address}</span> },
    { key: "date", header: "Date & Time", render: (r) => `${r.date} · ${r.time}` },
    { key: "packageCount", header: "Packages", render: (r) => r.packageCount },
    {
      key: "driver",
      header: "Driver",
      render: (r) => r.driver ?? <span className="text-muted-foreground">—</span>,
    },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pickup Requests"
        description="Schedule a pickup and track its progress"
        right={<CreatePickupDialog  onCreate={handleCreate} />}
      />

      <FilterTabs
        options={filterOptions.map((f) => ({ ...f, count: counts[f.value] }))}
        value={filter}
        onChange={setFilter}
      />

      <DataTableCard
        title={`${filtered.length} request${filtered.length === 1 ? "" : "s"}`}
        columns={columns}
        data={filtered}
        rowKey={(r) => r.id}
        emptyState="No pickup requests in this category."
      />
    </div>
  )
}