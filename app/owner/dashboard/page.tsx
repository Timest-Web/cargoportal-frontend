"use client";

import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  PackagePlus, UserPlus, UserCog, FileText, PackageCheck, Loader,
  CheckCircle2, CreditCard, TrendingUp, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatCard } from "@/components/owner/stat-card";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { activity, naira, needsAttention, pipeline, revenueByDay, routeBreakdown, shipments } from "@/lib/mock/owner";

const chartConfig = { revenue: { label: "Revenue", color: "var(--primary)" } } satisfies ChartConfig;

const quickActions = [
  { label: "Create shipment", href: "/owner/shipments/new", icon: PackagePlus },
  { label: "Add customer", href: "/owner/customers/new", icon: UserPlus },
  { label: "Add agent", href: "/owner/agents/new", icon: UserCog },
  { label: "Create invoice", href: "/owner/invoices/new", icon: FileText },
];

export default function OwnerDashboardPage() {
  const maxPipeline = Math.max(...pipeline.map((p) => p.count));
  const maxRoute = Math.max(...routeBreakdown.map((r) => r.shipments));

  return (
    <>
      <OwnerPageHeader
        title="Today"
        description="Here is what is happening across your warehouses and routes."
        actions={
          <Button nativeButton={false} render={<Link href="/owner/shipments/new" />}>
            <PackagePlus /> Create shipment
          </Button>
        }
      />

      {/* Today's summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <OwnerStatCard label="Shipments received" value="24" hint="+6 vs yesterday" icon={PackageCheck} tone="info" />
        <OwnerStatCard label="Processing" value="58" icon={Loader} tone="warning" />
        <OwnerStatCard label="Delivered" value="17" icon={CheckCircle2} tone="primary" />
        <OwnerStatCard label="Outstanding payments" value={naira(1840000)} icon={CreditCard} tone="destructive" />
        <OwnerStatCard label="Revenue today" value={naira(920000)} icon={TrendingUp} tone="wallet" />
      </div>

      {/* Revenue + quick actions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue this week</CardTitle>
            <CardDescription>Shipment, customs and insurance charges collected</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={revenueByDay}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Quick actions</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex flex-col items-start gap-3 rounded-xl border p-4 text-sm font-medium transition-colors hover:bg-accent"
              >
                <a.icon className="size-5 text-primary" />
                {a.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pipeline, routes, attention */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Shipment pipeline</CardTitle>
            <CardDescription>Where active shipments are right now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pipeline.map((p) => (
              <div key={p.stage} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{p.stage}</span>
                  <span className="font-medium">{p.count}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${(p.count / maxPipeline) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Routes this month</CardTitle>
            <CardDescription>Shipments and revenue per route</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {routeBreakdown.map((r) => (
              <div key={r.route} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{r.route}</span>
                  <span className="text-muted-foreground">{r.shipments} · {naira(r.revenue)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-info" style={{ width: `${(r.shipments / maxRoute) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Needs your attention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {needsAttention.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-accent"
              >
                <span>{n.label}</span>
                <span className="flex items-center gap-1 font-medium">
                  {n.count} <ChevronRight className="size-4 text-muted-foreground" />
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent shipments + activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent shipments</CardTitle>
            <Button nativeButton={false} render={<Link href="/owner/shipments" />} variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.slice(0, 5).map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.id}</TableCell>
                    <TableCell>{s.customer}</TableCell>
                    <TableCell className="hidden md:table-cell">{s.route}</TableCell>
                    <TableCell><OwnerStatusBadge status={s.status} /></TableCell>
                    <TableCell className="text-right">{naira(s.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activity.map((a) => (
                <li key={a.text} className="flex gap-3 text-sm">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p>{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}