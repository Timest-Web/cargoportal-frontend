"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"

import PageHeader from "@/components/shared/page-header"
import FilterTabs from "@/components/shared/filter-tabs"
import StatusBadge from "@/components/shared/status-badge"
import CreateTicketDialog from "@/components/support/create-ticket-dialog"
import FaqAccordion from "@/components/support/faq-accordion"
import { Button } from "@/components/ui/button"
import type { TicketFormValues } from "@/lib/validations/ticket"
import DataTableCard, { DataTableColumn } from "@/components/shared/data-table"

type Ticket = {
  id: string
  subject: string
  category: string
  status: "Open" | "Pending" | "Resolved"
  createdAt: string
}

const initialTickets: Ticket[] = [
  { id: "TCK-501", subject: "Shipment delayed past ETA", category: "shipment", status: "Open", createdAt: "2026-07-29" },
  { id: "TCK-498", subject: "Wallet funding not reflecting", category: "payment", status: "Pending", createdAt: "2026-07-27" },
  { id: "TCK-490", subject: "Update pickup address", category: "account", status: "Resolved", createdAt: "2026-07-20" },
]

const faqItems = [
  { question: "How long does customs clearance take?", answer: "Typically 2-5 business days depending on the shipment category and destination port." },
  { question: "Can I change my pickup address after scheduling?", answer: "Yes, as long as the pickup hasn't been assigned to a driver yet. Contact support otherwise." },
  { question: "How do refunds work?", answer: "Refunds are reviewed within 3 business days and credited back to your wallet once approved." },
]

const filterOptions = [
  { label: "Open", value: "Open" },
  { label: "Pending", value: "Pending" },
  { label: "Resolved", value: "Resolved" },
]

export default function SupportCenterPage() {
  const [tickets, setTickets] = useState(initialTickets)
  const [filter, setFilter] = useState("Open")

  function handleCreate(values: TicketFormValues) {
    const newTicket: Ticket = {
      id: `TCK-${Math.floor(500 + Math.random() * 100)}`,
      subject: values.subject,
      category: values.category,
      status: "Open",
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setTickets((prev) => [newTicket, ...prev])
    setFilter("Open")
  }

  const filtered = tickets.filter((t) => t.status === filter)

  const columns: DataTableColumn<Ticket>[] = [
    { key: "id", header: "Ticket ID", render: (t) => <span className="font-mono text-sm">{t.id}</span> },
    { key: "subject", header: "Subject", render: (t) => t.subject },
    { key: "category", header: "Category", render: (t) => <span className="capitalize text-muted-foreground">{t.category}</span> },
    { key: "createdAt", header: "Created", render: (t) => <span className="text-muted-foreground">{t.createdAt}</span> },
    { key: "status", header: "Status", render: (t) => <StatusBadge status={t.status} /> },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Center"
        description="Get help with your shipments, payments, or account"
        right={
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl">
              <MessageCircle className="mr-2 h-4 w-4" /> Live Chat
            </Button>
            <CreateTicketDialog onCreate={handleCreate} />
          </div>
        }
      />

      <FilterTabs
        options={filterOptions.map((f) => ({ ...f, count: tickets.filter((t) => t.status === f.value).length }))}
        value={filter}
        onChange={setFilter}
      />

      <DataTableCard
        title={`${filtered.length} ticket${filtered.length === 1 ? "" : "s"}`}
        columns={columns}
        data={filtered}
        rowKey={(t) => t.id}
        emptyState="No tickets in this category."
      />

      <div>
        <h3 className="mb-3 text-base font-medium">Frequently asked questions</h3>
        <FaqAccordion items={faqItems} />
      </div>
    </div>
  )
}