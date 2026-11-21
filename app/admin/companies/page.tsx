"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { AdminStatusBadge } from "@/components/admin/status-badge";
import { companiesSeed, compact, type CompanyStatus } from "@/lib/mock/admin";
import { cn } from "@/lib/utils";

const tabs = ["All", "Pending", "Active", "Suspended", "Expired"] as const;

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(companiesSeed);
  const [tab, setTab] = useState<string>("All");
  const [q, setQ] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const rows = useMemo(
    () => companies.filter((c) => (tab === "All" || c.status === tab) && (c.name + c.owner + c.id).toLowerCase().includes(q.toLowerCase())),
    [companies, tab, q]
  );
  const setStatus = (id: string, status: CompanyStatus) => setCompanies((all) => all.map((c) => (c.id === id ? { ...c, status } : c)));
  const count = (t: string) => (t === "All" ? companies.length : companies.filter((c) => c.status === t).length);
  const target = companies.find((c) => c.id === deleting);

  return (
    <>
      <OwnerPageHeader
        title="Cargo companies"
        description="Approve registrations, monitor health and manage access for every company."
        actions={<Button nativeButton={false} render={<Link href="/admin/companies/new" />}><Plus /> Create company</Button>}
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Tabs value={tab} onValueChange={(v) => setTab(v ?? "All")}>
          <TabsList>{tabs.map((t) => <TabsTrigger key={t} value={t}>{t} <span className="ml-1.5 text-xs text-muted-foreground">{count(t)}</span></TabsTrigger>)}</TabsList>
        </Tabs>
        <div className="relative md:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search company, owner or ID" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead><TableHead>Plan</TableHead><TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell text-right">Customers</TableHead>
                <TableHead className="hidden md:table-cell text-right">Shipments</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Revenue</TableHead>
                <TableHead className="hidden lg:table-cell">Health</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && <TableRow><TableCell colSpan={8} className="py-10 text-center text-muted-foreground">No companies match this view.</TableCell></TableRow>}
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Link href={`/admin/companies/${c.id}`}><p className="font-medium hover:underline">{c.name}</p><p className="text-xs text-muted-foreground">{c.id} · {c.owner}</p></Link>
                  </TableCell>
                  <TableCell>{c.plan}</TableCell>
                  <TableCell><AdminStatusBadge status={c.status} /></TableCell>
                  <TableCell className="hidden md:table-cell text-right">{c.customers.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{c.shipments.toLocaleString()}</TableCell>
                  <TableCell className="hidden lg:table-cell text-right">{compact(c.revenue)}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {c.status === "Pending" ? <span className="text-xs text-muted-foreground">—</span> : (
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-muted"><div className={cn("h-1.5 rounded-full", c.health >= 70 ? "bg-primary" : c.health >= 50 ? "bg-warning" : "bg-destructive")} style={{ width: `${c.health}%` }} /></div>
                        <span className="text-xs text-muted-foreground">{c.health}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Company actions" />}><MoreHorizontal /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem render={<Link href={`/admin/companies/${c.id}`} />}>View activity</DropdownMenuItem>
                        {c.status === "Pending" && <DropdownMenuItem onClick={() => setStatus(c.id, "Active")}>Approve registration</DropdownMenuItem>}
                        {c.status !== "Pending" && <DropdownMenuItem>Impersonate company</DropdownMenuItem>}
                        {c.status === "Active" && <DropdownMenuItem onClick={() => setStatus(c.id, "Suspended")}>Suspend</DropdownMenuItem>}
                        {c.status === "Suspended" && <DropdownMenuItem onClick={() => setStatus(c.id, "Active")}>Reactivate</DropdownMenuItem>}
                        <DropdownMenuItem className="text-destructive" onClick={() => setDeleting(c.id)}>Delete company</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={deleting !== null} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {target?.name}?</DialogTitle>
            <DialogDescription>This removes the workspace, its customers and all shipment records. This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setCompanies((all) => all.filter((c) => c.id !== deleting)); setDeleting(null); }}>Delete company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}