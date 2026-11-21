"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, Plus, Route as RouteIcon, TrendingUp, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { ColorCard } from "@/components/kit/color-card";
import { EntityCell } from "@/components/kit/entity-cell";
import { RowTable } from "@/components/kit/row-table";
import { StatusPill } from "@/components/kit/status-pill";
import { tones } from "@/components/kit/tones";
import { compact, routesSeed } from "@/lib/mock/admin";

export default function RoutesPage() {
  const [routes, setRoutes] = useState(routesSeed);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const [days, setDays] = useState("");

  const toggle = (id: string) => setRoutes((all) => all.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  const create = () => {
    if (!origin.trim() || !days) return;
    setRoutes((all) => [...all, { id: "RT-" + (all.length + 1), name: `${origin.trim()} → Nigeria`, origin: origin.trim(), shipments: 0, revenue: 0, transitDays: Number(days), companies: 0, enabled: false }]);
    setOpen(false); setOrigin(""); setDays("");
  };
  const totalRevenue = routes.reduce((n, r) => n + r.revenue, 0);
  const totalShipments = routes.reduce((n, r) => n + r.shipments, 0);
  const live = routes.filter((r) => r.enabled);
  const avgTransit = live.length ? Math.round(live.reduce((n, r) => n + r.transitDays, 0) / live.length) : 0;

  return (
    <>
      <OwnerPageHeader
        title="Routes"
        description="Corridors available to cargo companies. Disabled routes are hidden from every workspace."
        actions={<><Button variant="outline" nativeButton={false} render={<Link href="/admin/pricing" />}>Manage pricing</Button><Button onClick={() => setOpen(true)}><Plus /> Create route</Button></>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ColorCard tone="primary" label="Enabled routes" value={`${live.length} / ${routes.length}`} icon={RouteIcon} />
        <ColorCard tone="info" label="Shipments" value={totalShipments.toLocaleString()} icon={Boxes} />
        <ColorCard tone="wallet" label="Route revenue" value={compact(totalRevenue)} icon={TrendingUp} />
        <ColorCard tone="warning" label="Avg transit" value={`${avgTransit} days`} icon={Clock} />
      </div>

      <RowTable
        rows={routes}
        rowKey={(r) => r.id}
        accent={(r) => (r.enabled ? "primary" : "slate")}
        columns={[
          { key: "route", header: "Route", cell: (r) => <EntityCell title={r.name} subtitle={r.id} /> },
          { key: "status", header: "Status", cell: (r) => <StatusPill status={r.enabled ? "Enabled" : "Disabled"} /> },
          { key: "companies", header: "Companies", align: "right", hide: "md", cell: (r) => r.companies },
          { key: "shipments", header: "Shipments", align: "right", cell: (r) => r.shipments.toLocaleString() },
          { key: "transit", header: "Transit", align: "right", hide: "md", cell: (r) => `${r.transitDays} days` },
          { key: "revenue", header: "Revenue", align: "right", cell: (r) => <span className="font-medium">{compact(r.revenue)}</span> },
          {
            key: "share", header: "Share", hide: "lg",
            cell: (r) => <div className="h-1.5 w-24 rounded-full bg-muted"><div className={`h-1.5 rounded-full ${tones.wallet.bar}`} style={{ width: `${totalRevenue ? (r.revenue / totalRevenue) * 100 : 0}%` }} /></div>,
          },
          { key: "actions", header: "", align: "right", cell: (r) => <Button size="sm" variant="outline" onClick={() => toggle(r.id)}>{r.enabled ? "Disable" : "Enable"}</Button> },
        ]}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create route</DialogTitle><DialogDescription>New routes start disabled so you can set pricing before companies see them.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <OwnerField label="Origin country"><Input placeholder="e.g. Turkey" value={origin} onChange={(e) => setOrigin(e.target.value)} /></OwnerField>
            <OwnerField label="Destination"><Input readOnly value="Nigeria" /></OwnerField>
            <OwnerField label="Average transit (days)"><Input type="number" value={days} onChange={(e) => setDays(e.target.value)} /></OwnerField>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!origin.trim() || !days} onClick={create}>Create route</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}