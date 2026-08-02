"use client"

import { useState } from "react"

import PageHeader from "@/components/shared/page-header"
import FilterTabs from "@/components/shared/filter-tabs"
import StatusBadge from "@/components/shared/status-badge"
import WalletBalanceCard from "@/components/wallet/wallet-balance-card"
import type { FundWalletValues } from "@/lib/validations/wallet"
import DataTableCard, { DataTableColumn } from "@/components/shared/data-table"

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "credit" | "debit"
  status: "Completed" | "Pending" | "Failed"
}

type RefundRequest = {
  id: string
  date: string
  description: string
  amount: number
  status: "Pending" | "Approved" | "Rejected" | "Completed"
}

const transactions: Transaction[] = [
  { id: "TXN-3021", date: "2026-07-28", description: "Wallet funding · Bank transfer", amount: 50000, type: "credit", status: "Completed" },
  { id: "TXN-3018", date: "2026-07-26", description: "Shipment UK-2024-000124", amount: 48500, type: "debit", status: "Completed" },
  { id: "TXN-3015", date: "2026-07-22", description: "Wallet funding · Card", amount: 20000, type: "credit", status: "Completed" },
  { id: "TXN-3011", date: "2026-07-20", description: "Shipment USA-2024-000072", amount: 72000, type: "debit", status: "Pending" },
]

const refundRequests: RefundRequest[] = [
  { id: "RF-0091", date: "2026-07-18", description: "Duplicate charge on UK-2024-000118", amount: 15900, status: "Pending" },
  { id: "RF-0084", date: "2026-07-10", description: "Cancelled pickup PU-1021", amount: 5000, status: "Approved" },
  { id: "RF-0079", date: "2026-06-30", description: "Overcharged customs fee", amount: 8200, status: "Completed" },
]

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString()}`
}

const views = [
  { label: "Transaction History", value: "transactions" },
  { label: "Refund Requests", value: "refunds" },
]

export default function WalletPage() {
  const [view, setView] = useState("transactions")
  const [balance, setBalance] = useState(25400)

  function handleFund(values: FundWalletValues) {
    setBalance((prev) => prev + values.amount)
  }

  const transactionColumns: DataTableColumn<Transaction>[] = [
    { key: "date", header: "Date", render: (t) => <span className="text-muted-foreground">{t.date}</span> },
    { key: "description", header: "Description", render: (t) => t.description },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      render: (t) => (
        <span className={`tabular-nums ${t.type === "credit" ? "text-success" : "text-foreground"}`}>
          {t.type === "credit" ? "+" : "-"}
          {formatNaira(t.amount)}
        </span>
      ),
    },
    { key: "status", header: "Status", render: (t) => <StatusBadge status={t.status} /> },
  ]

  const refundColumns: DataTableColumn<RefundRequest>[] = [
    { key: "date", header: "Date", render: (r) => <span className="text-muted-foreground">{r.date}</span> },
    { key: "description", header: "Description", render: (r) => r.description },
    { key: "amount", header: "Amount", align: "right", render: (r) => <span className="tabular-nums">{formatNaira(r.amount)}</span> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Wallet" description="Fund your wallet and track transactions" />

      <WalletBalanceCard balance={formatNaira(balance)} onFund={handleFund} />

      <FilterTabs options={views} value={view} onChange={setView} />

      {view === "transactions" ? (
        <DataTableCard
          title="Transaction history"
          columns={transactionColumns}
          data={transactions}
          rowKey={(t) => t.id}
          emptyState="No transactions yet."
        />
      ) : (
        <DataTableCard
          title="Refund requests"
          columns={refundColumns}
          data={refundRequests}
          rowKey={(r) => r.id}
          emptyState="No refund requests yet."
        />
      )}
    </div>
  )
}