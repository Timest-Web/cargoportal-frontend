"use client";

import Link from "next/link";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { AdminKpi } from "@/components/admin/kpi";
import { AdminStatusBadge } from "@/components/admin/status-badge";
import { companiesSeed, compact, countries, kpis, platformSeries } from "@/lib/mock/admin";

const revenueConfig = { revenue: { label: "Revenue", color: "var(--primary)" } } satisfies ChartConfig;
const growthConfig = { companies: { label: "Companies", color: "var(--info)" } } satisfies ChartConfig;
const volumeConfig = {
  uk: { label: "UK", color: "var(--info)" },
  usa: { label: "USA", color: "var(--wallet)" },
  china: { label: "China", color: "var(--primary)" },
} satisfies ChartConfig;
const planConfig = {
  trial: { label: "Trial", color: "var(--muted-foreground)" },
  basic: { label: "Basic", color: "var(--info)" },
  standard: { label: "Standard", color: "var(--wallet)" },
  premium: { label: "Premium", color: "var(--primary)" },
  enterprise: { label: "Enterprise", color: "var(--warning)" },
} satisfies ChartConfig;

const planMix = (["Trial", "Basic", "Standard", "Premium", "Enterprise"] as const).map((p) => ({
  plan: p.toLowerCase(),
  value: companiesSeed.filter((c) => c.plan === p && c.status !== "Pending").length,
  fill: `var(--color-${p.toLowerCase()})`,
}));

const attention = [
  { label: "Registrations awaiting approval", count: 2, href: "/admin/companies" },
  { label: "Expired subscriptions to chase", count: 5, href: "/admin/subscriptions" },
  { label: "Urgent support tickets", count: 3, href: "/admin/support" },
  { label: "Trials ending this week", count: 4, href: "/admin/subscriptions" },
];

export default function AdminDashboardPage() {
  const [range, setRange] = useState("12");
  const data = platformSeries.slice(-Number(range));
  const maxShip = Math.max(...countries.map((c) => c.shipments));
  const top = [...companiesSeed].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <>
      <OwnerPageHeader
        title="Platform overview"
        description="Growth, revenue and activity across every cargo company on the platform."
        actions={
          <Tabs value={range} onValueChange={(v) => setRange(v ?? "12")}>
            <TabsList><TabsTrigger value="6">6 months</TabsTrigger><TabsTrigger value="12">12 months</TabsTrigger></TabsList>
          </Tabs>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => <AdminKpi key={k.label} {...k} />)}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenue trend</CardTitle><CardDescription>Total platform revenue per month</CardDescription></CardHeader>
          <CardContent>
            <ChartContainer config={revenueConfig} className="h-64 w-full">
              <AreaChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={52} tickFormatter={(v) => compact(v)} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="revenue" type="monotone" stroke="var(--color-revenue)" fill="var(--color-revenue)" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Plan mix</CardTitle><CardDescription>Companies per subscription plan</CardDescription></CardHeader>
          <CardContent>
            <ChartContainer config={planConfig} className="mx-auto h-64 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="plan" hideLabel />} />
                <Pie data={planMix} dataKey="value" nameKey="plan" innerRadius={55} strokeWidth={3} />
                <ChartLegend content={<ChartLegendContent nameKey="plan" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Company growth</CardTitle><CardDescription>Cumulative cargo companies</CardDescription></CardHeader>
          <CardContent>
            <ChartContainer config={growthConfig} className="h-56 w-full">
              <LineChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="companies" type="monotone" stroke="var(--color-companies)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Shipment volume</CardTitle><CardDescription>Monthly shipments by origin route</CardDescription></CardHeader>
          <CardContent>
            <ChartContainer config={volumeConfig} className="h-56 w-full">
              <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="uk" stackId="a" fill="var(--color-uk)" />
                <Bar dataKey="usa" stackId="a" fill="var(--color-usa)" />
                <Bar dataKey="china" stackId="a" fill="var(--color-china)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Active countries</CardTitle><CardDescription>Companies operating and shipments this month</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {countries.map((c) => (
              <div key={c.country} className="space-y-1.5">
                <div className="flex justify-between text-sm"><span>{c.country}</span><span className="text-muted-foreground">{c.companies} companies · {c.shipments.toLocaleString()}</span></div>
                <div className="h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${(c.shipments / maxShip) * 100}%` }} /></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Top companies by revenue</CardTitle>
            <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/admin/companies" />}>View all</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Plan</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Shipments</TableHead><TableHead className="text-right">Revenue</TableHead></TableRow></TableHeader>
              <TableBody>
                {top.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium"><Link href={`/admin/companies/${c.id}`} className="hover:underline">{c.name}</Link></TableCell>
                    <TableCell>{c.plan}</TableCell>
                    <TableCell><AdminStatusBadge status={c.status} /></TableCell>
                    <TableCell className="text-right">{c.shipments.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{compact(c.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Needs your attention</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {attention.map((a) => (
              <Link key={a.label} href={a.href} className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-accent">
                <span>{a.label}</span>
                <span className="flex items-center gap-1 font-medium">{a.count}<ChevronRight className="size-4 text-muted-foreground" /></span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}