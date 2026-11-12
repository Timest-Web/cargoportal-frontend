"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { naira } from "@/lib/mock/owner";
import { agentsSeed, agentTypes } from "@/lib/mock/money-team";

export default function AgentsPage() {
  const [filter, setFilter] = useState<string>("All");
  const rows = agentsSeed.filter((a) => filter === "All" || a.type === filter);

  return (
    <>
      <OwnerPageHeader
        title="Agents"
        description="Partners who register and update packages in the UK, USA, China and Nigeria."
        actions={<Button nativeButton={false} render={<Link href="/owner/agents/new" />}><Plus /> Add agent</Button>}
      />
      <Tabs value={filter} onValueChange={(v) => setFilter(v ?? "All")}>
        <TabsList>{["All", ...agentTypes].map((t) => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList>
      </Tabs>
      <Card>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead><TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Customers</TableHead>
                <TableHead className="hidden md:table-cell">Shipments</TableHead>
                <TableHead>Commission owed</TableHead><TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No agents of this type yet.</TableCell></TableRow>}
              {rows.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <Link href={`/owner/agents/${a.id}`}>
                      <p className="font-medium hover:underline">{a.name}</p><p className="text-xs text-muted-foreground">{a.email}</p>
                    </Link>
                  </TableCell>
                  <TableCell>{a.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{a.customerIds.length}</TableCell>
                  <TableCell className="hidden md:table-cell">{a.shipmentsHandled}</TableCell>
                  <TableCell>{naira(a.earned - a.paid)}</TableCell>
                  <TableCell><OwnerStatusBadge status={a.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}