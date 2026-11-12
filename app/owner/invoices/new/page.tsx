"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { naira, shipments } from "@/lib/mock/owner";

const charge = z.number({ message: "Enter an amount" }).min(0, "Cannot be negative");
const schema = z.object({
  shipmentId: z.string().min(1, "Choose a shipment"),
  dueDate: z.string().min(1, "Set a due date"),
  shipping: charge, customs: charge, insurance: charge, delivery: charge,
});
type FormValues = z.infer<typeof schema>;
const shipmentItems = shipments.map((s) => ({ value: s.id, label: `${s.id} · ${s.customer}` }));

export default function NewInvoicePage() {
  const { register, control, watch, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { shipmentId: "", dueDate: "", shipping: 0, customs: 0, insurance: 0, delivery: 0 },
  });
  const v = watch();
  const total = [v.shipping, v.customs, v.insurance, v.delivery].reduce((s, n) => s + (Number.isFinite(n) ? n : 0), 0);
  const selected = shipments.find((s) => s.id === v.shipmentId);

  const fields: { name: "shipping" | "customs" | "insurance" | "delivery"; label: string }[] = [
    { name: "shipping", label: "Shipment charges" }, { name: "customs", label: "Customs charges" },
    { name: "insurance", label: "Insurance charges" }, { name: "delivery", label: "Delivery charges" },
  ];

  return (
    <>
      <OwnerPageHeader title="Create invoice" description="Pick a shipment and enter the charges. The total updates as you type." />
      <form onSubmit={handleSubmit((x) => console.log(x))} className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Invoice details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <OwnerField label="Shipment" error={errors.shipmentId?.message}>
              <Controller name="shipmentId" control={control} render={({ field }) => (
                <Select items={shipmentItems} value={field.value} onValueChange={(val) => {
                  field.onChange(val ?? "");
                  const s = shipments.find((x) => x.id === val);
                  if (s) setValue("shipping", s.amount);
                }}>
                  <SelectTrigger><SelectValue placeholder="Select shipment" /></SelectTrigger>
                  <SelectContent>{shipmentItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </OwnerField>
            <OwnerField label="Due date" error={errors.dueDate?.message}><Input type="date" {...register("dueDate")} /></OwnerField>
            {fields.map((f) => (
              <OwnerField key={f.name} label={`${f.label} (₦)`} error={errors[f.name]?.message}>
                <Input type="number" {...register(f.name, { valueAsNumber: true })} />
              </OwnerField>
            ))}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-medium">{selected?.customer ?? "—"}</span></div>
            {fields.map((f) => (
              <div key={f.name} className="flex justify-between"><span className="text-muted-foreground">{f.label}</span><span>{naira(Number.isFinite(v[f.name]) ? v[f.name] : 0)}</span></div>
            ))}
            <div className="flex justify-between border-t pt-3 text-base font-semibold"><span>Total</span><span>{naira(total)}</span></div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>Create invoice</Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}