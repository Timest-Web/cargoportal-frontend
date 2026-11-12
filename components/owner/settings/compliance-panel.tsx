"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OwnerStatusBadge } from "@/components/owner/status-badge";
import { complianceSeed } from "@/lib/mock/records";

export function CompliancePanel() {
  const [docs, setDocs] = useState(complianceSeed);

  const onFile = (id: string, file: File | undefined) => {
    if (!file) return;
    setDocs((all) => all.map((d) => (d.id === id ? { ...d, file: file.name, status: "Pending" } : d)));
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Company documents</CardTitle>
        <CardDescription>The platform team reviews these before your workspace is fully approved.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {docs.map((d) => (
          <div key={d.id} className="flex items-center justify-between gap-4 rounded-xl border p-4">
            <div>
              <p className="text-sm font-medium">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.file ?? "Nothing uploaded yet"}</p>
            </div>
            <div className="flex items-center gap-3">
              <OwnerStatusBadge status={d.status} />
              <Button size="sm" variant="outline" nativeButton={false} render={<label />}>
                <Upload /> {d.file ? "Replace" : "Upload"}
                <input type="file" accept=".pdf,image/*" className="sr-only" onChange={(e) => onFile(d.id, e.target.files?.[0])} />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}