"use client";

import Link from "next/link";
import { useState } from "react";
import { CircleAlert, FileText, Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatCard } from "@/components/owner/stat-card";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { naira } from "@/lib/mock/owner";
import { invoiceTotal, invoices, type InvoiceStatus } from "@/lib/mock/money-team";

const filters: ("All" | InvoiceStatus)[] = ["All", "Unpaid", "Part paid", "Overdue", "Paid"];

export default function InvoicesPage() {
  const [filter, setFilter] = useState<"All" | InvoiceStatus>("All");
  const rows = invoices.filter((i) => filter === "All" || i.status === filter);
  const outstanding = invoices.reduce((s, i) => s + invoiceTotal(i) - i.paid, 0);

  return (
    <>
      <OwnerPageHeader
        title="Invoices"
        description="Shipment, customs, insurance and delivery charges billed to customers."
        actions={<Button nativeButton={false} render={<Link href="/owner/invoices/new" />}><Plus /> Create invoice</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <OwnerStatCard label="Invoices issued" value={String(invoices.length)} icon={FileText} tone="info" />
        <OwnerStatCard label="Outstanding" value={naira(outstanding)} icon={Wallet} tone="warning" />
        <OwnerStatCard label="Overdue" value={String(invoices.filter((i) => i.status === "Overdue").length)} icon={CircleAlert} tone="destructive" />
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter((v ?? "All") as typeof filter)}>
        <TabsList>{filters.map((f) => <TabsTrigger key={f} value={f}>{f}</TabsTrigger>)}</TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead><TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Shipment</TableHead>
                <TableHead className="hidden md:table-cell">Due</TableHead>
                <TableHead>Status</TableHead><TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No invoices with this status.</TableCell></TableRow>}
              {rows.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium"><Link href={`/owner/invoices/${i.id}`} className="hover:underline">{i.id}</Link></TableCell>
                  <TableCell>{i.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">{i.shipmentId}</TableCell>
                  <TableCell className="hidden md:table-cell">{i.due}</TableCell>
                  <TableCell><OwnerStatusBadge status={i.status} /></TableCell>
                  <TableCell className="text-right">{naira(invoiceTotal(i))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}