"use client";

import { useState } from "react";
import { Plane, Ship, Shield, Landmark, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { EntityCell } from "@/components/kit/entity-cell";
import { RowTable } from "@/components/kit/row-table";
import { tones, type Tone } from "@/components/kit/tones";
import { naira, pricingCategories, pricingSeedAdmin, routesSeed, type PricingKey } from "@/lib/mock/admin";
import { cn } from "@/lib/utils";

const routeNames = routesSeed.map((r) => r.name);
const routeItems = routeNames.map((r) => ({ value: r, label: r }));
const typeItems = [{ value: "air", label: "Air freight" }, { value: "sea", label: "Sea freight" }];
const meta: Record<PricingKey, { tone: Tone; icon: typeof Plane; money: boolean }> = {
  air: { tone: "info", icon: Plane, money: true }, sea: { tone: "wallet", icon: Ship, money: true },
  customs: { tone: "warning", icon: Landmark, money: false }, insurance: { tone: "primary", icon: Shield, money: false },
  pickup: { tone: "destructive", icon: Truck, money: true },
};

export default function PricingPage() {
  const [prices, setPrices] = useState(pricingSeedAdmin);
  const [cat, setCat] = useState<PricingKey>("air");
  const [saved, setSaved] = useState<string | null>(null);
  const [route, setRoute] = useState(routeNames[0]);
  const [type, setType] = useState<"air" | "sea">("air");
  const [weight, setWeight] = useState("20");
  const [pickup, setPickup] = useState(false);

  const set = (key: PricingKey, r: string, v: string) => { setSaved(null); setPrices((p) => ({ ...p, [key]: { ...p[key], [r]: Number(v) } })); };
  const avg = (k: PricingKey) => { const v = Object.values(prices[k]); const a = v.reduce((n, x) => n + x, 0) / v.length; return meta[k].money ? naira(Math.round(a)) : `${a.toFixed(1)}%`; };

  const w = Number(weight) || 0;
  const freight = prices[type][route] * w;
  const customs = freight * (prices.customs[route] / 100);
  const insurance = freight * (prices.insurance[route] / 100);
  const pick = pickup ? prices.pickup[route] : 0;
  const total = freight + customs + insurance + pick;
  const active = pricingCategories.find((c) => c.key === cat)!;

  return (
    <>
      <OwnerPageHeader title="Global pricing engine" description="Default rates every cargo company starts from. Companies can override them in their own settings." />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {pricingCategories.map((c) => {
          const m = meta[c.key]; const t = tones[m.tone]; const on = cat === c.key;
          return (
            <button key={c.key} onClick={() => setCat(c.key)} className={cn("relative overflow-hidden rounded-2xl p-4 text-left transition-all", t.solid, on ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : "opacity-75 hover:opacity-100")}>
              <span className="pointer-events-none absolute -right-5 -top-5 size-20 rounded-full bg-white/10" />
              <div className="relative space-y-3">
                <span className={cn("flex size-9 items-center justify-center rounded-lg", t.onSolid)}><m.icon className="size-4" /></span>
                <div><p className="text-sm opacity-85">{c.label}</p><p className="text-xl font-semibold">{avg(c.key)}</p><p className="text-xs opacity-80">average · {c.unit}</p></div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>{active.label}</CardTitle><CardDescription>{active.note} Rates in {active.unit}.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <RowTable
              rows={routeNames}
              rowKey={(r) => r}
              accent={() => meta[cat].tone}
              columns={[
                { key: "route", header: "Route", cell: (r) => <EntityCell title={r} /> },
                { key: "rate", header: `Rate (${active.unit})`, align: "right", cell: (r) => <Input type="number" step="0.1" className="ml-auto w-36 text-right" aria-label={`${active.label} ${r}`} value={prices[cat][r]} onChange={(e) => set(cat, r, e.target.value)} /> },
              ]}
            />
            <div className="flex items-center gap-3"><Button onClick={() => setSaved(cat)}>Save {active.label.toLowerCase()}</Button>{saved === cat && <span className="text-sm text-muted-foreground">Saved.</span>}</div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader><CardTitle>Price simulator</CardTitle><CardDescription>Test what a customer would be quoted.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <OwnerField label="Route">
              <Select items={routeItems} value={route} onValueChange={(v) => setRoute(v ?? routeNames[0])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{routeItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
            </OwnerField>
            <OwnerField label="Shipment type">
              <Select items={typeItems} value={type} onValueChange={(v) => setType((v ?? "air") as "air" | "sea")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{typeItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
            </OwnerField>
            <OwnerField label="Weight (kg)"><Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} /></OwnerField>
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" className="size-4 accent-[var(--primary)]" checked={pickup} onChange={(e) => setPickup(e.target.checked)} /> Include pickup</label>
            <div className={cn("relative overflow-hidden rounded-2xl p-4", tones.slate.solid)}>
              <span className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/10" />
              <dl className="relative space-y-1.5 text-sm">
                {([["Freight", freight], ["Customs", customs], ["Insurance", insurance], ["Pickup", pick]] as const).map(([k, v]) => (
                  <div key={k} className="flex justify-between opacity-85"><dt>{k}</dt><dd>{naira(Math.round(v))}</dd></div>
                ))}
                <div className="flex items-baseline justify-between border-t border-white/20 pt-2"><dt>Estimated total</dt><dd className="text-2xl font-semibold">{naira(Math.round(total))}</dd></div>
              </dl>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}