/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Camera, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { OwnerSignaturePad } from "@/components/owner/signature-pad";
import { OwnerStatCard } from "@/components/owner/stat-card";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { PackageCheck, Truck, UserX } from "lucide-react";
import { deliveriesSeed, drivers, type DeliveryStatus } from "@/lib/mock/operations";

const riderItems = drivers.map((d) => ({ value: d, label: d }));
const badge = (s: DeliveryStatus) =>
  s === "Unassigned" ? "Pending" : s === "Assigned" ? "Processing" : s === "Out for delivery" ? "Out For Delivery" : "Delivered";

export default function DeliveriesPage() {
  const [items, setItems] = useState(deliveriesSeed);
  const [order, setOrder] = useState<Record<string, string[]>>({});
  const [confirming, setConfirming] = useState<string | null>(null);
  const [recipient, setRecipient] = useState("");
  const [signed, setSigned] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const update = (id: string, patch: Partial<(typeof items)[number]>) =>
    setItems((all) => all.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  // Route plan: active stops per rider, in the order the owner sets
  const active = items.filter((d) => d.rider && d.status !== "Delivered");
  const riders = [...new Set(active.map((d) => d.rider!))];
  const stopsFor = (rider: string) => {
    const stops = active.filter((d) => d.rider === rider);
    const saved = order[rider] ?? [];
    return [...stops].sort((a, b) => {
      const ia = saved.indexOf(a.id), ib = saved.indexOf(b.id);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  };
  const move = (rider: string, id: string, dir: -1 | 1) => {
    const ids = stopsFor(rider).map((s) => s.id);
    const i = ids.indexOf(id), j = i + dir;
    if (j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    setOrder((o) => ({ ...o, [rider]: ids }));
  };

  const openConfirm = (id: string) => { setConfirming(id); setRecipient(""); setSigned(false); setPhoto(null); };
  const confirm = () => {
    if (confirming && recipient && signed) {
      update(confirming, { status: "Delivered", signedBy: recipient });
      setConfirming(null);
    }
  };

  return (
    <>
      <OwnerPageHeader title="Deliveries" description="Assign riders, plan routes and capture proof of delivery." />

      <div className="grid gap-4 sm:grid-cols-3">
        <OwnerStatCard label="Unassigned" value={String(items.filter((d) => d.status === "Unassigned").length)} icon={UserX} tone="warning" />
        <OwnerStatCard label="Out for delivery" value={String(items.filter((d) => d.status === "Out for delivery").length)} icon={Truck} tone="wallet" />
        <OwnerStatCard label="Delivered" value={String(items.filter((d) => d.status === "Delivered").length)} icon={PackageCheck} tone="primary" />
      </div>

      <Card>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Delivery</TableHead><TableHead>Customer</TableHead>
                <TableHead className="hidden lg:table-cell">Address</TableHead>
                <TableHead>Rider</TableHead><TableHead>Status</TableHead><TableHead className="w-40" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <p className="font-medium">{d.id}</p>
                    <p className="text-xs text-muted-foreground">{d.shipmentId}</p>
                  </TableCell>
                  <TableCell>{d.customer}</TableCell>
                  <TableCell className="hidden max-w-56 truncate lg:table-cell">{d.address}</TableCell>
                  <TableCell className="w-48">
                    {d.status === "Delivered" ? (
                      <span className="text-sm">{d.rider}</span>
                    ) : (
                      <Select items={riderItems} value={d.rider ?? ""} onValueChange={(v) => v && update(d.id, { rider: v, status: d.status === "Unassigned" ? "Assigned" : d.status })}>
                        <SelectTrigger><SelectValue placeholder="Assign rider" /></SelectTrigger>
                        <SelectContent>{riderItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell><OwnerStatusBadge status={badge(d.status)} /></TableCell>
                  <TableCell className="text-right">
                    {d.status === "Assigned" && <Button size="sm" variant="outline" onClick={() => update(d.id, { status: "Out for delivery" })}>Dispatch</Button>}
                    {d.status === "Out for delivery" && <Button size="sm" onClick={() => openConfirm(d.id)}>Confirm delivery</Button>}
                    {d.status === "Delivered" && <span className="text-xs text-muted-foreground">Signed by {d.signedBy}</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Route plan</h2>
        {riders.length === 0 && <p className="text-sm text-muted-foreground">Assign a rider to a delivery to start a route plan.</p>}
        <div className="grid gap-4 md:grid-cols-2">
          {riders.map((r) => (
            <Card key={r}>
              <CardHeader>
                <CardTitle>{r}</CardTitle>
                <CardDescription>{stopsFor(r).length} stops. Use the arrows to set the visiting order.</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {stopsFor(r).map((s, i) => (
                    <li key={s.id} className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">{i + 1}</span>
                      <div className="flex-1">
                        <p className="font-medium">{s.customer}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" />{s.address}</p>
                      </div>
                      <Button size="icon" variant="ghost" aria-label="Move up" onClick={() => move(r, s.id, -1)}><ArrowUp /></Button>
                      <Button size="icon" variant="ghost" aria-label="Move down" onClick={() => move(r, s.id, 1)}><ArrowDown /></Button>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={confirming !== null} onOpenChange={(o) => !o && setConfirming(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm delivery</DialogTitle>
            <DialogDescription>Delivery {confirming}. Capture the recipient's signature and a photo as proof.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <OwnerField label="Received by"><Input value={recipient} onChange={(e) => setRecipient(e.target.value)} /></OwnerField>
            <OwnerField label="Signature"><OwnerSignaturePad onChange={setSigned} /></OwnerField>
            <OwnerField label="Photo proof">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground hover:bg-accent/40">
                <Camera className="size-4" />
                {photo ? photo.name : "Take or upload a photo"}
                <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
              </label>
            </OwnerField>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirming(null)}>Cancel</Button>
            <Button disabled={!recipient || !signed} onClick={confirm}>Confirm delivery</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}