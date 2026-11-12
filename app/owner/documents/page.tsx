"use client";

import { useState } from "react";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { shipments } from "@/lib/mock/owner";
import { documentsSeed, documentTypes, type DocumentType } from "@/lib/mock/records";

const typeItems = documentTypes.map((t) => ({ value: t, label: t }));
const shipmentItems = shipments.map((s) => ({ value: s.id, label: `${s.id} · ${s.customer}` }));

export default function DocumentsPage() {
  const [docs, setDocs] = useState(documentsSeed);
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [shipmentId, setShipmentId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const rows = docs.filter((d) => filter === "All" || d.type === filter);
  const reset = () => { setType(""); setShipmentId(""); setFile(null); };

  const upload = () => {
    if (!file || !type || !shipmentId) return;
    setDocs((d) => [{
      id: "DOC-" + (412 + d.length), name: file.name, type: type as DocumentType, shipmentId, uploadedBy: "You",
      date: new Date().toISOString().slice(0, 10), size: (file.size / 1024).toFixed(0) + " KB", url: URL.createObjectURL(file),
    }, ...d]);
    setOpen(false); reset();
  };

  return (
    <>
      <OwnerPageHeader
        title="Documents"
        description="Airway bills, customs forms, invoices, delivery notes and proof of delivery."
        actions={<Button onClick={() => setOpen(true)}><Upload /> Upload document</Button>}
      />

      <Tabs value={filter} onValueChange={(v) => setFilter(v ?? "All")}>
        <TabsList className="flex-wrap">{["All", ...documentTypes].map((t) => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead><TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Shipment</TableHead><TableHead className="hidden lg:table-cell">Uploaded by</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead><TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No documents of this type yet. Upload one to get started.</TableCell></TableRow>}
              {rows.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-info/10 text-info"><FileText className="size-4" /></span>
                      <div><p className="font-medium">{d.name}</p><p className="text-xs text-muted-foreground">{d.size}</p></div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{d.type}</TableCell>
                  <TableCell>{d.shipmentId}</TableCell>
                  <TableCell className="hidden lg:table-cell">{d.uploadedBy}</TableCell>
                  <TableCell className="hidden md:table-cell">{d.date}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      {d.url && <Button size="icon" variant="ghost" aria-label="Download" nativeButton={false} render={<a href={d.url} download={d.name} />}><Download /></Button>}
                      <Button size="icon" variant="ghost" aria-label="Delete document" onClick={() => setDocs((all) => all.filter((x) => x.id !== d.id))}><Trash2 /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Upload document</DialogTitle><DialogDescription>Attach a file to a shipment so everyone on the team can find it.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <OwnerField label="Document type">
              <Select items={typeItems} value={type} onValueChange={(v) => setType(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>{typeItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
            </OwnerField>
            <OwnerField label="Shipment">
              <Select items={shipmentItems} value={shipmentId} onValueChange={(v) => setShipmentId(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="Select shipment" /></SelectTrigger>
                <SelectContent>{shipmentItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
            </OwnerField>
            <OwnerField label="File">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground hover:bg-accent/40">
                <Upload className="size-4" />{file ? file.name : "Choose a PDF or image"}
                <input type="file" accept=".pdf,image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              </label>
            </OwnerField>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!file || !type || !shipmentId} onClick={upload}>Upload</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}