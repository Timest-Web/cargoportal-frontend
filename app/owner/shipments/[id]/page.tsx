"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { naira, shipmentLifecycle, shipments, type ShipmentStatus } from "@/lib/mock/owner";
import { buildTimeline } from "@/lib/mock/operations";
import { cn } from "@/lib/utils";

const statusItems = shipmentLifecycle.map((s) => ({ value: s, label: s }));

export default function ShipmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const shipment = shipments.find((s) => s.id === id);
  const [status, setStatus] = useState<ShipmentStatus>(shipment?.status ?? "Shipment Created");
  const [next, setNext] = useState<string>("");

  if (!shipment) {
    return (
      <>
        <OwnerPageHeader title="Shipment not found" description={`No shipment with the number ${id}.`} />
        <Button variant="outline" nativeButton={false} render={<Link href="/owner/shipments" />}>Back to shipments</Button>
      </>
    );
  }

  const timeline = buildTimeline(status, shipment.date);
  const details: [string, string][] = [
    ["Customer", shipment.customer], ["Route", shipment.route], ["Type", shipment.type],
    ["Weight", `${shipment.weightKg} kg`], ["Charges", naira(shipment.amount)], ["Created", shipment.date],
  ];

  return (
    <>
      <OwnerPageHeader
        title={shipment.id}
        description={`${shipment.route} · ${shipment.type}`}
        actions={
          <>
            <OwnerStatusBadge status={status} />
            <Button variant="outline" nativeButton={false} render={<Link href="/owner/shipments" />}>
              <ArrowLeft /> All shipments
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Shipment timeline</CardTitle></CardHeader>
          <CardContent>
            <ol className="relative space-y-0">
              {timeline.map((t, i) => (
                <li key={t.label} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < timeline.length - 1 && (
                    <span className={cn("absolute left-[11px] top-6 h-full w-px", t.state === "done" ? "bg-primary" : "bg-border")} />
                  )}
                  <span
                    className={cn(
                      "z-10 flex size-6 shrink-0 items-center justify-center rounded-full border text-primary-foreground",
                      t.state === "done" && "border-primary bg-primary",
                      t.state === "current" && "border-primary bg-primary ring-4 ring-primary/20",
                      t.state === "upcoming" && "bg-background"
                    )}
                  >
                    {t.state !== "upcoming" && <Check className="size-3.5" />}
                  </span>
                  <div className="flex flex-1 items-center justify-between">
                    <span className={cn("text-sm", t.state === "upcoming" ? "text-muted-foreground" : "font-medium")}>{t.label}</span>
                    <span className="text-xs text-muted-foreground">{t.date}</span>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Update status</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Select items={statusItems} value={next} onValueChange={(v) => setNext(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="Choose new status" /></SelectTrigger>
                <SelectContent>{statusItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
              <Button className="w-full" disabled={!next} onClick={() => next && setStatus(next as ShipmentStatus)}>
                Update status
              </Button>
              <p className="text-xs text-muted-foreground">Customers are notified by email, SMS and WhatsApp when the status changes.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Details</CardTitle></CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                {details.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}