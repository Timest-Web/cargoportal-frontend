"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Boxes, HeartPulse, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OwnerPageHeader } from "@/components/owner/header";
import { ColorCard } from "@/components/kit/color-card";
import { RowTable } from "@/components/kit/row-table";
import { StatusPill } from "@/components/kit/status-pill";
import { tones, toneFor, type Tone } from "@/components/kit/tones";
import { companiesSeed, companyActivity, companyPayments, compact, naira, type CompanyStatus } from "@/lib/mock/admin";
import { planTone } from "@/lib/plan-tone";
import { cn } from "@/lib/utils";

const heroTone: Record<CompanyStatus, Tone> = { Active: "primary", Pending: "warning", Suspended: "destructive", Expired: "slate" };
const dotTones: Tone[] = ["primary", "info", "wallet", "warning"];

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const company = companiesSeed.find((c) => c.id === id);
  const [status, setStatus] = useState<CompanyStatus>(company?.status ?? "Active");

  if (!company) {
    return (
      <>
        <OwnerPageHeader title="Company not found" description={`No company with the ID ${id}.`} />
        <Button variant="outline" nativeButton={false} render={<Link href="/admin/companies" />}>Back to companies</Button>
      </>
    );
  }

  const t = tones[heroTone[status]];
  const info: [string, string][] = [["Owner", company.owner], ["Email", company.email], ["Plan", company.plan], ["Joined", company.joined], ["Renews", company.renews]];
  const healthTone: Tone = company.health >= 70 ? "primary" : company.health >= 50 ? "warning" : "destructive";

  return (
    <>
      <Button variant="ghost" size="sm" className="-ml-2 w-fit" nativeButton={false} render={<Link href="/admin/companies" />}><ArrowLeft /> All companies</Button>

      <div className={cn("relative overflow-hidden rounded-2xl p-6", t.solid)}>
        <span className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-white/10" />
        <span className="pointer-events-none absolute -bottom-16 right-24 size-36 rounded-full bg-white/10" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm opacity-85">{company.id} · {company.plan} plan</p>
            <h1 className="text-2xl font-semibold tracking-tight">{company.name}</h1>
            <p className="mt-1 text-sm opacity-85">{company.owner} · {company.email}</p>
            <span className="mt-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium">{status}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {status !== "Pending" && <Button variant="secondary">Impersonate</Button>}
            {status === "Pending" && <Button variant="secondary" onClick={() => setStatus("Active")}>Approve registration</Button>}
            {status === "Active" && <Button variant="secondary" onClick={() => setStatus("Suspended")}>Suspend</Button>}
            {status === "Suspended" && <Button variant="secondary" onClick={() => setStatus("Active")}>Reactivate</Button>}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ColorCard variant="soft" tone="info" label="Customers" value={company.customers.toLocaleString()} icon={Users} />
        <ColorCard variant="soft" tone="wallet" label="Shipments" value={company.shipments.toLocaleString()} icon={Boxes} />
        <ColorCard variant="soft" tone="primary" label="Revenue" value={compact(company.revenue)} icon={TrendingUp} />
        <ColorCard variant="soft" tone={healthTone} label="Health score" value={company.health ? `${company.health}/100` : "—"} icon={HeartPulse} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Company and subscription</CardTitle></CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              {info.map(([k, v]) => <div key={k} className="flex justify-between gap-4"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}
            </dl>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Payment history</CardTitle></CardHeader>
          <CardContent>
            <RowTable
              rows={company.revenue > 0 ? companyPayments : []}
              rowKey={(p) => p.id}
              accent={(p) => toneFor(p.status)}
              empty="No payments yet."
              columns={[
                { key: "id", header: "Payment", cell: (p) => <div><p className="font-medium">{p.id}</p><p className="text-xs text-muted-foreground">{p.date}</p></div> },
                { key: "plan", header: "Plan", cell: (p) => <StatusPill status={p.plan} tone={planTone[p.plan as keyof typeof planTone]} /> },
                { key: "status", header: "Status", cell: (p) => <StatusPill status={p.status} /> },
                { key: "amount", header: "Amount", align: "right", cell: (p) => <span className="font-medium">{naira(p.amount)}</span> },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {companyActivity.map((a, i) => (
              <li key={a.text} className="flex gap-3 text-sm"><span className={cn("mt-1.5 size-2 shrink-0 rounded-full", tones[dotTones[i % 4]].dot)} /><div><p>{a.text}</p><p className="text-xs text-muted-foreground">{a.time}</p></div></li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}