"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Banknote, Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatCard } from "@/components/owner/stat-card";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { customers, naira } from "@/lib/mock/owner";
import { agentsSeed } from "@/lib/mock/money-team";

export default function AgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const agent = agentsSeed.find((a) => a.id === id);
  const [assigned, setAssigned] = useState<string[]>(agent?.customerIds ?? []);
  const [paid, setPaid] = useState(agent?.paid ?? 0);

  if (!agent) {
    return (
      <>
        <OwnerPageHeader title="Agent not found" description={`No agent with the ID ${id}.`} />
        <Button variant="outline" nativeButton={false} render={<Link href="/owner/agents" />}>Back to agents</Button>
      </>
    );
  }

  const owed = agent.earned - paid;
  const toggle = (cid: string) => setAssigned((a) => (a.includes(cid) ? a.filter((x) => x !== cid) : [...a, cid]));

  return (
    <>
      <OwnerPageHeader
        title={agent.name}
        description={`${agent.type} · ${agent.route} · ${agent.commissionRate}% commission`}
        actions={
          <>
            <OwnerStatusBadge status={agent.status} />
            <Button variant="outline" nativeButton={false} render={<Link href="/owner/agents" />}><ArrowLeft /> All agents</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <OwnerStatCard label="Customers assigned" value={String(assigned.length)} icon={Users} tone="info" />
        <OwnerStatCard label="Shipments handled" value={String(agent.shipmentsHandled)} icon={Package} tone="primary" />
        <OwnerStatCard label="Commission owed" value={naira(owed)} hint={`${naira(paid)} paid so far`} icon={Banknote} tone="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Assign customers</CardTitle><CardDescription>Tick the customers this agent looks after.</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {customers.map((c) => (
              <label key={c.id} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm hover:bg-accent/40">
                <input type="checkbox" className="size-4 accent-[var(--primary)]" checked={assigned.includes(c.id)} onChange={() => toggle(c.id)} />
                <span className="flex-1"><span className="font-medium">{c.name}</span><span className="ml-2 text-xs text-muted-foreground">{c.id} · {c.city}</span></span>
              </label>
            ))}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader><CardTitle>Commission</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Total earned</span><span>{naira(agent.earned)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Paid out</span><span>{naira(paid)}</span></div>
            <div className="flex justify-between border-t pt-3 font-medium"><span>Owed</span><span>{naira(owed)}</span></div>
            <Button className="w-full" disabled={owed <= 0} onClick={() => setPaid(agent.earned)}>Pay {naira(owed)}</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}