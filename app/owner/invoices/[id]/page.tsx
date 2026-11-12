"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { naira } from "@/lib/mock/owner";
import { invoiceTotal, invoices, type InvoiceStatus } from "@/lib/mock/money-team";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const invoice = invoices.find((i) => i.id === id);
  const [status, setStatus] = useState<InvoiceStatus>(invoice?.status ?? "Unpaid");

  if (!invoice) {
    return (
      <>
        <OwnerPageHeader title="Invoice not found" description={`No invoice with the number ${id}.`} />
        <Button variant="outline" nativeButton={false} render={<Link href="/owner/invoices" />}>Back to invoices</Button>
      </>
    );
  }

  const total = invoiceTotal(invoice);
  const paid = status === "Paid" ? total : invoice.paid;
  const lines: [string, number][] = [
    ["Shipment charges", invoice.shipping], ["Customs charges", invoice.customs],
    ["Insurance charges", invoice.insurance], ["Delivery charges", invoice.delivery],
  ];

  return (
    <>
      <OwnerPageHeader
        title={invoice.id}
        description={`Billed to ${invoice.customer}`}
        actions={
          <>
            <Button variant="outline" nativeButton={false} render={<Link href="/owner/invoices" />}><ArrowLeft /> All invoices</Button>
            <Button variant="outline" onClick={() => window.print()}><Printer /> Print</Button>
            {status !== "Paid" && <Button onClick={() => setStatus("Paid")}>Mark as paid</Button>}
          </>
        }
      />
      <Card className="max-w-2xl">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Shipment</p>
              <Link href={`/owner/shipments/${invoice.shipmentId}`} className="font-medium hover:underline">{invoice.shipmentId}</Link>
            </div>
            <OwnerStatusBadge status={status} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-muted-foreground">Issued</p><p className="font-medium">{invoice.issued}</p></div>
            <div><p className="text-muted-foreground">Due</p><p className="font-medium">{invoice.due}</p></div>
          </div>
          <div className="space-y-3 border-t pt-4 text-sm">
            {lines.map(([k, v]) => <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span>{naira(v)}</span></div>)}
            <div className="flex justify-between border-t pt-3 text-base font-semibold"><span>Total</span><span>{naira(total)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Paid</span><span>{naira(paid)}</span></div>
            <div className="flex justify-between font-medium"><span>Balance due</span><span>{naira(total - paid)}</span></div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}