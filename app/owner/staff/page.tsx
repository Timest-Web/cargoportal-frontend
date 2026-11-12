/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { rolePermissions, staffRoles, staffSeed } from "@/lib/mock/money-team";

export default function StaffPage() {
  const [staff, setStaff] = useState(staffSeed);
  const toggle = (id: string) =>
    setStaff((all) => all.map((s) => (s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s)));

  return (
    <>
      <OwnerPageHeader
        title="Staff"
        description="People who work inside your company workspace."
        actions={<Button nativeButton={false} render={<Link href="/owner/staff/new" />}><Plus /> Add staff</Button>}
      />
      <Card>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead><TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead>Status</TableHead><TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9"><AvatarFallback>{s.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                      <div><p className="font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.email}</p></div>
                    </div>
                  </TableCell>
                  <TableCell>{s.role}</TableCell>
                  <TableCell className="hidden md:table-cell">{s.location}</TableCell>
                  <TableCell><OwnerStatusBadge status={s.status} /></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Staff actions" />}><MoreHorizontal /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Change role</DropdownMenuItem>
                        <DropdownMenuItem>Reset password</DropdownMenuItem>
                        <DropdownMenuItem className={s.status === "Active" ? "text-destructive" : ""} onClick={() => toggle(s.id)}>
                          {s.status === "Active" ? "Deactivate" : "Reactivate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>What each role can do</CardTitle><CardDescription>Pick the role that matches the person's job when adding staff.</CardDescription></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {staffRoles.map((r) => (
            <div key={r} className="rounded-xl border p-4"><p className="text-sm font-medium">{r}</p><p className="mt-1 text-sm text-muted-foreground">{rolePermissions[r]}</p></div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}