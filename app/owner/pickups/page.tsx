"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { drivers, pickupsSeed, type PickupStatus } from "@/lib/mock/operations";

const driverItems = drivers.map((d) => ({ value: d, label: d }));
const filters: ("All" | PickupStatus)[] = ["All", "Requested", "Approved", "Scheduled", "Completed"];

const badge = (s: PickupStatus) =>
  s === "Requested" ? "Pending" : s === "Approved" ? "Processing" : s === "Scheduled" ? "In Transit" : "Delivered";

export default function PickupsPage() {
  const [pickups, setPickups] = useState(pickupsSeed);
  const [filter, setFilter] = useState<"All" | PickupStatus>("All");
  const [editing, setEditing] = useState<string | null>(null);
  const [driver, setDriver] = useState("");
  const [when, setWhen] = useState("");

  const rows = pickups.filter((p) => filter === "All" || p.status === filter);
  const update = (id: string, patch: Partial<(typeof pickups)[number]>) =>
    setPickups((all) => all.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const openSchedule = (id: string) => { setEditing(id); setDriver(""); setWhen(""); };
  const save = () => {
    if (editing && driver && when) {
      update(editing, { driver, scheduledFor: when, status: "Scheduled" });
      setEditing(null);
    }
  };

  return (
    <>
      <OwnerPageHeader title="Pickups" description="Approve customer pickup requests, then assign a driver and schedule the collection." />

      <Tabs value={filter} onValueChange={(v) => setFilter((v ?? "All") as typeof filter)}>
        <TabsList>{filters.map((f) => <TabsTrigger key={f} value={f}>{f}</TabsTrigger>)}</TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead><TableHead>Customer</TableHead>
                <TableHead className="hidden lg:table-cell">Address</TableHead>
                <TableHead className="hidden md:table-cell">Route</TableHead>
                <TableHead>Pickup</TableHead><TableHead>Status</TableHead><TableHead className="w-44" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && (
                <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">No {filter.toLowerCase()} pickups right now.</TableCell></TableRow>
              )}
              {rows.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell>{p.customer}</TableCell>
                  <TableCell className="hidden max-w-56 truncate lg:table-cell">{p.address}</TableCell>
                  <TableCell className="hidden md:table-cell">{p.route}</TableCell>
                  <TableCell>
                    <p>{p.scheduledFor ? p.scheduledFor.replace("T", " ") : `Wants ${p.preferred}`}</p>
                    {p.driver && <p className="text-xs text-muted-foreground">{p.driver}</p>}
                  </TableCell>
                  <TableCell><OwnerStatusBadge status={badge(p.status)} /></TableCell>
                  <TableCell className="text-right">
                    {p.status === "Requested" && (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={() => update(p.id, { status: "Approved" })}>Approve</Button>
                      </div>
                    )}
                    {p.status === "Approved" && <Button size="sm" variant="outline" onClick={() => openSchedule(p.id)}>Assign and schedule</Button>}
                    {p.status === "Scheduled" && <Button size="sm" variant="outline" onClick={() => update(p.id, { status: "Completed" })}>Mark collected</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign driver and schedule</DialogTitle>
            <DialogDescription>Pickup {editing}. The customer is notified once you save.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <OwnerField label="Driver">
              <Select items={driverItems} value={driver} onValueChange={(v) => setDriver(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="Select driver" /></SelectTrigger>
                <SelectContent>{driverItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
            </OwnerField>
            <OwnerField label="Date and time"><Input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} /></OwnerField>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button disabled={!driver || !when} onClick={save}>Schedule pickup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}