"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ScanLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { warehouseLoads, warehousePackages, warehouses } from "@/lib/mock/operations";

export default function WarehouseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const warehouse = warehouses.find((w) => w.id === id);
  const [scan, setScan] = useState("");
  const [packages, setPackages] = useState(warehousePackages);

  if (!warehouse) {
    return (
      <>
        <OwnerPageHeader title="Warehouse not found" description={`No warehouse with the ID ${id}.`} />
        <Button variant="outline" nativeButton={false} render={<Link href="/owner/warehouses" />}>Back to warehouses</Button>
      </>
    );
  }

  const receive = () => {
    if (!scan.trim()) return;
    setPackages((p) => [{ tracking: scan.trim(), customer: "Unassigned", shelf: "—", weightKg: 0, status: "Received" }, ...p]);
    setScan("");
  };
  const allocate = (tracking: string) =>
    setPackages((p) => p.map((x) => (x.tracking === tracking ? { ...x, shelf: "A-" + String(Math.floor(Math.random() * 40) + 1).padStart(2, "0"), status: "Shelved" } : x)));

  return (
    <>
      <OwnerPageHeader
        title={warehouse.name}
        description={`${warehouse.country} · ${warehouse.id} · Managed by ${warehouse.manager}`}
        actions={<Button variant="outline" nativeButton={false} render={<Link href="/owner/warehouses" />}><ArrowLeft /> All warehouses</Button>}
      />

      <Tabs defaultValue="packages">
        <TabsList>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="loading">Consolidation and loading</TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="mt-4 space-y-4">
          <Card>
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row">
              <div className="relative flex-1">
                <ScanLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Scan or type a package tracking number" value={scan}
                  onChange={(e) => setScan(e.target.value)} onKeyDown={(e) => e.key === "Enter" && receive()} />
              </div>
              <Button onClick={receive}>Receive package</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Package</TableHead><TableHead>Customer</TableHead><TableHead>Shelf</TableHead><TableHead>Weight</TableHead><TableHead>Status</TableHead><TableHead className="w-32" /></TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((p) => (
                    <TableRow key={p.tracking}>
                      <TableCell className="font-medium">{p.tracking}</TableCell>
                      <TableCell>{p.customer}</TableCell>
                      <TableCell>{p.shelf}</TableCell>
                      <TableCell>{p.weightKg ? `${p.weightKg} kg` : "—"}</TableCell>
                      <TableCell><OwnerStatusBadge status={p.status === "Shelved" ? "Verified" : p.status === "Received" ? "Pending" : p.status} /></TableCell>
                      <TableCell className="text-right">
                        {p.shelf === "—" && <Button size="sm" variant="outline" onClick={() => allocate(p.tracking)}>Allocate shelf</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loading" className="mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Flights and containers</CardTitle>
              <div className="flex gap-2"><Button size="sm" variant="outline">Consolidate shipments</Button><Button size="sm">New load</Button></div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Load</TableHead><TableHead>Type</TableHead><TableHead>Route</TableHead><TableHead>Packages</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {warehouseLoads.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium">{l.id}</TableCell><TableCell>{l.kind}</TableCell>
                      <TableCell>{l.route}</TableCell><TableCell>{l.packages}</TableCell>
                      <TableCell><Badge variant="secondary">{l.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}