"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { customers, naira, shipments } from "@/lib/mock/owner";

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const customer = customers.find((c) => c.id === id);
  const [suspended, setSuspended] = useState(customer?.status === "Suspended");

  if (!customer) {
    return (
      <>
        <OwnerPageHeader title="Customer not found" description={`No customer with the ID ${id}.`} />
        <Button variant="outline" nativeButton={false} render={<Link href="/owner/customers" />}>Back to customers</Button>
      </>
    );
  }

  const history = shipments.filter((s) => s.customer === customer.name);
  const profile: [string, string][] = [
    ["Customer ID", customer.id], ["Email", customer.email], ["Phone", customer.phone],
    ["City", customer.city], ["Total shipments", String(customer.shipments)],
  ];

  return (
    <>
      <OwnerPageHeader
        title={customer.name}
        description={customer.id}
        actions={
          <>
            <Button variant="outline" nativeButton={false} render={<Link href="/owner/customers" />}><ArrowLeft /> All customers</Button>
            <Button variant={suspended ? "default" : "destructive"} onClick={() => setSuspended((s) => !s)}>
              {suspended ? "Reactivate customer" : "Suspend customer"}
            </Button>
          </>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                {profile.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                ))}
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>KYC and account</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">KYC status</span><OwnerStatusBadge status={customer.kyc} /></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Account</span><span className="font-medium">{suspended ? "Suspended" : "Active"}</span></div>
              {customer.kyc === "Pending" && (
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">Approve KYC</Button>
                  <Button size="sm" variant="outline" className="flex-1">Reject</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Shipment history</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Shipment</TableHead><TableHead>Route</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {history.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="py-10 text-center text-muted-foreground">This customer has no shipments yet.</TableCell></TableRow>
                )}
                {history.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium"><Link href={`/owner/shipments/${s.id}`} className="hover:underline">{s.id}</Link></TableCell>
                    <TableCell>{s.route}</TableCell>
                    <TableCell><OwnerStatusBadge status={s.status} /></TableCell>
                    <TableCell className="text-right">{naira(s.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}