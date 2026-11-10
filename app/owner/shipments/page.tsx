"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { naira, routes, shipmentLifecycle, shipments } from "@/lib/mock/owner";

const routeItems = [{ value: "all", label: "All routes" }, ...routes.map((r) => ({ value: r, label: r }))];
const statusItems = [{ value: "all", label: "All statuses" }, ...shipmentLifecycle.map((s) => ({ value: s, label: s }))];

export default function ShipmentsPage() {
  const [q, setQ] = useState("");
  const [route, setRoute] = useState("all");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      shipments.filter(
        (s) =>
          (route === "all" || s.route === route) &&
          (status === "all" || s.status === status) &&
          (s.id + s.customer).toLowerCase().includes(q.toLowerCase())
      ),
    [q, route, status]
  );

  return (
    <>
      <OwnerPageHeader
        title="Shipments"
        description="Track every package from creation to delivery."
        actions={
          <Button nativeButton={false} render={<Link href="/owner/shipments/new" />}>
            <Plus /> Create shipment
          </Button>
        }
      />
      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search by shipment number or customer" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Select items={routeItems} value={route} onValueChange={(v) => setRoute(v ?? "all")}>
              <SelectTrigger className="md:w-48"><SelectValue /></SelectTrigger>
              <SelectContent>{routeItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
            </Select>
            <Select items={statusItems} value={status} onValueChange={(v) => setStatus(v ?? "all")}>
              <SelectTrigger className="md:w-56"><SelectValue /></SelectTrigger>
              <SelectContent>{statusItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment</TableHead><TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Route</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Weight</TableHead>
                <TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    No shipments match these filters. Clear a filter or create a new shipment.
                  </TableCell>
                </TableRow>
              )}
              {rows.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">
                    <Link href={`/owner/shipments/${s.id}`} className="hover:underline">{s.id}</Link>
                  </TableCell>
                  <TableCell>{s.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">{s.route}</TableCell>
                  <TableCell className="hidden lg:table-cell">{s.type}</TableCell>
                  <TableCell className="hidden lg:table-cell">{s.weightKg} kg</TableCell>
                  <TableCell><OwnerStatusBadge status={s.status} /></TableCell>
                  <TableCell className="text-right">{naira(s.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}