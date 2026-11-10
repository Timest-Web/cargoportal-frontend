"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { customers } from "@/lib/mock/owner";

export default function CustomersPage() {
  const [q, setQ] = useState("");
  const rows = customers.filter((c) => (c.name + c.email + c.id).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <OwnerPageHeader
        title="Customers"
        description="Manage customer records, KYC status and shipping history."
        actions={
          <Button nativeButton={false} render={<Link href="/owner/customers/new" />}>
            <Plus /> Add customer
          </Button>
        }
      />
      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search name, email or ID" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">City</TableHead>
                <TableHead>KYC</TableHead>
                <TableHead className="hidden md:table-cell">Shipments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && (
                <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">No customers found. Try a different search or add a customer.</TableCell></TableRow>
              )}
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Link href={`/owner/customers/${c.id}`} className="flex items-center gap-3">
                      <Avatar className="size-9"><AvatarFallback>{c.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-medium hover:underline">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.id} · {c.email}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{c.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{c.city}</TableCell>
                  <TableCell><OwnerStatusBadge status={c.kyc} /></TableCell>
                  <TableCell className="hidden md:table-cell">{c.shipments}</TableCell>
                  <TableCell><Badge variant={c.status === "Active" ? "secondary" : "destructive"}>{c.status}</Badge></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Customer actions" />}>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem render={<Link href={`/owner/customers/${c.id}`} />}>View history</DropdownMenuItem>
                        <DropdownMenuItem>Edit customer</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Suspend customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}