"use client";

import { useState } from "react";
import { Eye, Download, CreditCard } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import StatusBadge from "@/components/shared/status-badge";
import RowActionsMenu from "@/components/shared/row-actions-menu";
import ConfirmDialog from "@/components/shared/confirm-dialog";
import DataTableCard, { DataTableColumn } from "@/components/shared/data-table";

type Invoice = {
  invoiceNo: string;
  shipmentTrackingNo: string;
  amount: string;
  dueDate: string;
  status: "Paid" | "Unpaid" | "Overdue";
};

const initialInvoices: Invoice[] = [
  {
    invoiceNo: "INV-2026-0142",
    shipmentTrackingNo: "UK-2024-000124",
    amount: "₦48,500",
    dueDate: "2026-08-05",
    status: "Unpaid",
  },
  {
    invoiceNo: "INV-2026-0139",
    shipmentTrackingNo: "USA-2024-000072",
    amount: "₦72,000",
    dueDate: "2026-07-28",
    status: "Overdue",
  },
  {
    invoiceNo: "INV-2026-0135",
    shipmentTrackingNo: "CN-2024-000019",
    amount: "₦33,200",
    dueDate: "2026-08-10",
    status: "Unpaid",
  },
  {
    invoiceNo: "INV-2026-0121",
    shipmentTrackingNo: "USA-2024-000061",
    amount: "₦54,000",
    dueDate: "2026-07-15",
    status: "Paid",
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [payTarget, setPayTarget] = useState<Invoice | null>(null);

  function handlePay() {
    if (!payTarget) return;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.invoiceNo === payTarget.invoiceNo
          ? { ...inv, status: "Paid" }
          : inv,
      ),
    );
    setPayTarget(null);
  }

  const columns: DataTableColumn<Invoice>[] = [
    {
      key: "invoiceNo",
      header: "Invoice Number",
      render: (i) => <span className="font-mono text-sm">{i.invoiceNo}</span>,
    },
    {
      key: "shipment",
      header: "Shipment",
      render: (i) => (
        <span className="font-mono text-sm text-muted-foreground">
          {i.shipmentTrackingNo}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      render: (i) => <span className="tabular-nums">{i.amount}</span>,
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (i) => <span className="text-muted-foreground">{i.dueDate}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: "actions",
      header: "",
      headClassName: "w-10",
      className: "text-right",
      render: (i) => (
        <RowActionsMenu
          actions={[
            ...(i.status !== "Paid"
              ? [
                  {
                    label: "Pay Now",
                    icon: CreditCard,
                    onSelect: () => setPayTarget(i),
                  },
                ]
              : []),
            {
              label: "Download Receipt",
              icon: Download,
              onSelect: () => console.log("download", i.invoiceNo),
            },
            {
              label: "View shipment",
              icon: Eye,
              onSelect: () => console.log("view", i.shipmentTrackingNo),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="View and pay outstanding shipment invoices"
      />

      <DataTableCard
        title={`${invoices.length} invoice${invoices.length === 1 ? "" : "s"}`}
        columns={columns}
        data={invoices}
        rowKey={(i) => i.invoiceNo}
        emptyState="No invoices yet."
      />

      <ConfirmDialog
        open={!!payTarget}
        onOpenChange={(open) => !open && setPayTarget(null)}
        title="Pay invoice"
        description={
          payTarget
            ? `Pay ${payTarget.amount} for invoice ${payTarget.invoiceNo}? This will be deducted from your wallet balance.`
            : ""
        }
        confirmLabel="Pay now"
        onConfirm={handlePay}
      />
    </div>
  );
}
