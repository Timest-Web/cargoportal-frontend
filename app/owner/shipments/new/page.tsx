"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { customers, routes } from "@/lib/mock/owner";

const originByRoute: Record<string, string> = {
  "UK → Nigeria": "United Kingdom",
  "USA → Nigeria": "United States",
  "China → Nigeria": "China",
};
const num = (msg: string) => z.number({ message: msg }).positive(msg);

const schema = z.object({
  shipmentNumber: z.string().min(1),
  customerId: z.string().min(1, "Choose a customer"),
  route: z.string().min(1, "Choose a route"),
  type: z.enum(["Air Cargo", "Sea Cargo"]),
  description: z.string().min(3, "Describe the package contents"),
  weight: num("Enter a weight above 0"),
  length: num("Required"),
  width: num("Required"),
  height: num("Required"),
});
type FormValues = z.infer<typeof schema>;

const customerItems = customers.map((c) => ({ value: c.id, label: c.name }));
const routeItems = routes.map((r) => ({ value: r, label: r }));
const typeItems = [{ value: "Air Cargo", label: "Air Cargo" }, { value: "Sea Cargo", label: "Sea Cargo" }];

export default function NewShipmentPage() {
  const { register, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { shipmentNumber: "SHP-10242", type: "Air Cargo", customerId: "", route: "", description: "" },
  });
  const route = watch("route");

  const onSubmit = (values: FormValues) => {
    // API mutation comes later
    console.log(values);
  };

  return (
    <>
      <OwnerPageHeader title="Create shipment" description="Record a package that has arrived or is about to be collected." />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Shipment details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <OwnerField label="Shipment number" error={errors.shipmentNumber?.message}>
              <Input readOnly {...register("shipmentNumber")} />
            </OwnerField>

            <OwnerField label="Customer" error={errors.customerId?.message}>
              <Controller name="customerId" control={control} render={({ field }) => (
                <Select items={customerItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                  <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                  <SelectContent>{customerItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </OwnerField>

            <OwnerField label="Route" error={errors.route?.message}>
              <Controller name="route" control={control} render={({ field }) => (
                <Select items={routeItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                  <SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger>
                  <SelectContent>{routeItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </OwnerField>

            <OwnerField label="Shipment type">
              <Controller name="type" control={control} render={({ field }) => (
                <Select items={typeItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "Air Cargo")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{typeItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </OwnerField>

            <OwnerField label="Origin country"><Input readOnly value={originByRoute[route] ?? ""} placeholder="Set by route" /></OwnerField>
            <OwnerField label="Destination country"><Input readOnly value="Nigeria" /></OwnerField>

            <OwnerField label="Package description" error={errors.description?.message} className="sm:col-span-2">
              <Textarea rows={3} placeholder="e.g. 2 cartons of clothing, 1 laptop" {...register("description")} />
            </OwnerField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Weight and dimensions</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <OwnerField label="Weight (kg)" error={errors.weight?.message}>
              <Input type="number" step="0.1" {...register("weight", { valueAsNumber: true })} />
            </OwnerField>
            <div className="grid grid-cols-3 gap-3">
              <OwnerField label="L (cm)" error={errors.length?.message}><Input type="number" {...register("length", { valueAsNumber: true })} /></OwnerField>
              <OwnerField label="W (cm)" error={errors.width?.message}><Input type="number" {...register("width", { valueAsNumber: true })} /></OwnerField>
              <OwnerField label="H (cm)" error={errors.height?.message}><Input type="number" {...register("height", { valueAsNumber: true })} /></OwnerField>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>Create shipment</Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}