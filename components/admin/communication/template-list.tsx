"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OwnerField } from "@/components/owner/field";
import { AdminStatusBadge } from "@/components/admin/status-badge";
import type { Template } from "@/lib/mock/admin-ops";

export function TemplateList({ title, items: seed, withSubject = false }: { title: string; items: Template[]; withSubject?: boolean }) {
  const [items, setItems] = useState(seed);
  const [editing, setEditing] = useState<Template | null>(null);

  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle><CardDescription>Variables such as {"{{customer_name}}"} are filled in when the message is sent.</CardDescription></CardHeader>
      <CardContent className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-4 rounded-xl border p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2"><p className="text-sm font-medium">{t.name}</p>{t.status && <AdminStatusBadge status={t.status === "Approved" ? "Active" : "Pending"} />}</div>
              {t.subject && <p className="text-xs text-muted-foreground">Subject: {t.subject}</p>}
              <p className="text-sm text-muted-foreground">{t.body}</p>
            </div>
            <Button size="icon" variant="ghost" aria-label={`Edit ${t.name}`} onClick={() => setEditing(t)}><Pencil /></Button>
          </div>
        ))}
      </CardContent>

      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit template</DialogTitle><DialogDescription>{editing?.name}</DialogDescription></DialogHeader>
          {editing && (
            <div className="space-y-4">
              {withSubject && <OwnerField label="Subject"><Input value={editing.subject ?? ""} onChange={(e) => setEditing({ ...editing, subject: e.target.value })} /></OwnerField>}
              <OwnerField label="Message"><Textarea rows={5} value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} /></OwnerField>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={() => { if (editing) setItems((all) => all.map((t) => (t.id === editing.id ? editing : t))); setEditing(null); }}>Save template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}