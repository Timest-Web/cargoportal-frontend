"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { AdminStatusBadge } from "@/components/admin/status-badge";
import { compact, naira, plans, subscriptionsSeed, type Plan } from "@/lib/mock/admin";

const planItems = plans.map((p) => ({ value: p.name, label: `${p.name} · ${naira(p.price)}/mo` }));
const rank = (p: Plan) => plans.findIndex((x) => x.name === p);
const price = (p: Plan) => plans.find((x) => x.name === p)!.price;

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState(subscriptionsSeed);
  const [editing, setEditing] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState("");

  const current = subs.find((s) => s.id === editing);
  const direction = current && newPlan ? (rank(newPlan as Plan) > rank(current.plan) ? "Upgrade" : rank(newPlan as Plan) < rank(current.plan) ? "Downgrade" : "") : "";
  const patch = (id: string, p: Partial<(typeof subs)[number]>) => setSubs((all) => all.map((s) => (s.id === id ? { ...s, ...p } : s)));
  const live = subs.filter((s) => s.status === "Active");
  const mrr = live.reduce((n, s) => n + price(s.plan), 0);

  return (
    <>
      <OwnerPageHeader title="Subscriptions" description={`Monthly recurring revenue from active plans: ${compact(mrr)}`} />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {plans.map((p) => {
          const n = live.filter((s) => s.plan === p.name).length;
          return (
            <Card key={p.name}>
              <CardContent className="space-y-2 p-4">
                <div className="flex items-baseline justify-between"><p className="font-semibold">{p.name}</p><p className="text-sm text-muted-foreground">{p.price ? `${naira(p.price)}/mo` : "Free"}</p></div>
                <p className="text-xs text-muted-foreground">{p.staff} · {p.shipments}</p>
                <p className="text-xs text-muted-foreground">{p.features}</p>
                <div className="flex items-baseline justify-between border-t pt-2 text-sm"><span>{n} active</span><span className="font-medium">{compact(n * p.price)}</span></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Plan</TableHead><TableHead>Status</TableHead><TableHead className="hidden md:table-cell">Renews</TableHead><TableHead className="text-right">Monthly</TableHead><TableHead className="w-10" /></TableRow></TableHeader>
            <TableBody>
              {subs.map((s) => (
                <TableRow key={s.id}>
                  <TableCell><p className="font-medium">{s.company}</p><p className="text-xs text-muted-foreground">{s.id}</p></TableCell>
                  <TableCell>{s.plan}</TableCell>
                  <TableCell><AdminStatusBadge status={s.status} /></TableCell>
                  <TableCell className="hidden md:table-cell">{s.renews}</TableCell>
                  <TableCell className="text-right">{naira(price(s.plan))}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Subscription actions" />}><MoreHorizontal /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setEditing(s.id); setNewPlan(""); }}>Change plan</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => patch(s.id, { status: s.plan === "Trial" ? "Trial" : "Active", renews: "2026-12-21" })}>Renew subscription</DropdownMenuItem>
                        {s.status !== "Cancelled" && <DropdownMenuItem className="text-destructive" onClick={() => patch(s.id, { status: "Cancelled" })}>Cancel subscription</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Change plan for {current?.company}</DialogTitle><DialogDescription>Currently on {current?.plan}. The change applies from the next billing date.</DialogDescription></DialogHeader>
          <OwnerField label="New plan">
            <Select items={planItems} value={newPlan} onValueChange={(v) => setNewPlan(v ?? "")}>
              <SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger>
              <SelectContent>{planItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
            </Select>
          </OwnerField>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button disabled={!direction} onClick={() => { if (editing) patch(editing, { plan: newPlan as Plan, status: newPlan === "Trial" ? "Trial" : "Active" }); setEditing(null); }}>{direction || "Select a different plan"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}