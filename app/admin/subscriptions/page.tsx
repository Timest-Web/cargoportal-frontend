"use client";

import { useState } from "react";
import { Building2, Check, Crown, Layers, MoreHorizontal, Package, Sparkles, type LucideIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";

const planItems = plans.map((p) => ({ value: p.name, label: `${p.name} · ${naira(p.price)}/mo` }));
const rank = (p: Plan) => plans.findIndex((x) => x.name === p);
const price = (p: Plan) => plans.find((x) => x.name === p)!.price;

// One colour identity per plan. Full class strings so Tailwind can see them.
const planStyle: Record<Plan, { icon: LucideIcon; head: string; chip: string; check: string; bar: string }> = {
  Trial: { icon: Sparkles, head: "bg-linear-to-br from-sidebar to-sidebar-accent text-sidebar-foreground", chip: "bg-white/10", check: "bg-muted text-foreground", bar: "bg-foreground/60" },
  Basic: { icon: Package, head: "bg-linear-to-br from-info to-info/60 text-white", chip: "bg-white/20", check: "bg-info/15 text-info", bar: "bg-info" },
  Standard: { icon: Layers, head: "bg-linear-to-br from-wallet to-wallet/60 text-white", chip: "bg-white/20", check: "bg-wallet/15 text-wallet", bar: "bg-wallet" },
  Premium: { icon: Crown, head: "bg-linear-to-br from-primary to-primary/60 text-primary-foreground", chip: "bg-white/20", check: "bg-primary/15 text-primary", bar: "bg-primary" },
  Enterprise: { icon: Building2, head: "bg-linear-to-br from-warning to-warning/60 text-warning-foreground", chip: "bg-black/10", check: "bg-warning/20 text-amber-700 dark:text-amber-300", bar: "bg-warning" },
};

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState(subscriptionsSeed);
  const [editing, setEditing] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState("");

  const current = subs.find((s) => s.id === editing);
  const direction = current && newPlan ? (rank(newPlan as Plan) > rank(current.plan) ? "Upgrade" : rank(newPlan as Plan) < rank(current.plan) ? "Downgrade" : "") : "";
  const patch = (id: string, p: Partial<(typeof subs)[number]>) => setSubs((all) => all.map((s) => (s.id === id ? { ...s, ...p } : s)));
  const live = subs.filter((s) => s.status === "Active");
  const mrr = live.reduce((n, s) => n + price(s.plan), 0);
  const counts = plans.map((p) => live.filter((s) => s.plan === p.name).length);
  const popular = plans[counts.indexOf(Math.max(...counts))].name;

  return (
    <>
      <OwnerPageHeader title="Subscriptions" description={`Monthly recurring revenue from active plans: ${compact(mrr)}`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {plans.map((p, i) => {
          const s = planStyle[p.name];
          const Icon = s.icon;
          const n = counts[i];
          const share = mrr ? Math.round(((n * p.price) / mrr) * 100) : 0;
          const perks = [p.staff, p.shipments, ...p.features.split(", ")];
          return (
            <div
              key={p.name}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                p.name === popular && "ring-2 ring-primary/40"
              )}
            >
              <div className={cn("relative overflow-hidden p-5", s.head)}>
                <span className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-white/10" />
                <span className="pointer-events-none absolute -bottom-10 right-8 size-20 rounded-full bg-white/10" />
                {p.name === popular && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">Most popular</span>
                )}
                <div className="relative">
                  <span className={cn("mb-4 flex size-10 items-center justify-center rounded-xl", s.chip)}><Icon className="size-5" /></span>
                  <p className="text-sm font-medium opacity-90">{p.name}</p>
                  <p className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-semibold tracking-tight">{p.price ? naira(p.price) : "Free"}</span>
                    {p.price > 0 && <span className="text-sm opacity-80">/mo</span>}
                  </p>
                </div>
              </div>

              <ul className="flex-1 space-y-2.5 p-5 text-sm">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2.5">
                    <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full", s.check)}><Check className="size-3" /></span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 border-t bg-muted/30 p-5">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted-foreground">{n} active {n === 1 ? "company" : "companies"}</span>
                  <span className="font-semibold">{compact(n * p.price)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted"><div className={cn("h-1.5 rounded-full", s.bar)} style={{ width: `${share}%` }} /></div>
                <p className="text-xs text-muted-foreground">{p.price ? `${share}% of monthly recurring revenue` : "Free tier, no revenue"}</p>
              </div>
            </div>
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