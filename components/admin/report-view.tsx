"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { naira } from "@/lib/mock/admin";
import type { Report } from "@/lib/mock/records";

function exportCsv(r: Report) {
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [r.columns.map((c) => esc(c.label)).join(","), ...r.rows.map((row) => r.columns.map((c) => esc(row[c.key])).join(","))];
  const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url; a.download = `${r.id}-report.csv`; a.click();
  URL.revokeObjectURL(url);
}

export function AdminReportView({ report }: { report: Report }) {
  const config = { value: { label: report.chartLabel, color: "var(--primary)" } } satisfies ChartConfig;
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div><CardTitle>{report.label} report</CardTitle><CardDescription>{report.description}</CardDescription></div>
          <Button variant="outline" size="sm" onClick={() => exportCsv(report)}><Download /> Export CSV</Button>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-64 w-full">
            <BarChart data={report.chart}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={6} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader><TableRow>{report.columns.map((c, i) => <TableHead key={c.key} className={i > 0 ? "text-right" : ""}>{c.label}</TableHead>)}</TableRow></TableHeader>
            <TableBody>
              {report.rows.map((row, ri) => (
                <TableRow key={ri}>{report.columns.map((c, i) => <TableCell key={c.key} className={i > 0 ? "text-right" : "font-medium"}>{c.money ? naira(Number(row[c.key])) : row[c.key]}</TableCell>)}</TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}