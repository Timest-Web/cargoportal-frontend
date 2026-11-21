"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OwnerPageHeader } from "@/components/owner/header";
import { AdminReportView } from "@/components/admin/report-view";
import { adminReports } from "@/lib/mock/admin-reports";

export default function AdminReportsPage() {
  return (
    <>
      <OwnerPageHeader title="Reports and analytics" description="Revenue, subscription, customer and shipment performance across the platform." />
      <Tabs defaultValue="revenue">
        <TabsList className="flex-wrap">{adminReports.map((r) => <TabsTrigger key={r.id} value={r.id}>{r.label}</TabsTrigger>)}</TabsList>
        {adminReports.map((r) => <TabsContent key={r.id} value={r.id} className="mt-4"><AdminReportView report={r} /></TabsContent>)}
      </Tabs>
    </>
  );
}