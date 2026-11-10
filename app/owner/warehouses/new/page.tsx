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

type Key = "region" | "city" | "postal" | "lga";
const countryFields: Record<string, { key: Key; label: string }[]> = {
  "United Kingdom": [{ key: "region", label: "County" }, { key: "city", label: "City" }, { key: "postal", label: "Postal code" }],
  "United States": [{ key: "region", label: "State" }, { key: "postal", label: "ZIP code" }],
  China: [{ key: "region", label: "Province" }, { key: "postal", label: "Postal code" }],
  Nigeria: [{ key: "region", label: "State" }, { key: "lga", label: "LGA" }],
};
const countryItems = Object.keys(countryFields).map((c) => ({ value: c, label: c }));

const schema = z
  .object({
    name: z.string().min(2, "Enter a warehouse name"),
    country: z.string().min(1, "Choose a country"),
    address: z.string().min(3, "Enter the street address"),
    region: z.string().optional(),
    city: z.string().optional(),
    postal: z.string().optional(),
    lga: z.string().optional(),
    manager: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    for (const f of countryFields[v.country] ?? []) {
      if (!v[f.key]) ctx.addIssue({ code: "custom", path: [f.key], message: "Required" });
    }
  });
type FormValues = z.infer<typeof schema>;

export default function NewWarehousePage() {
  const { register, control, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", country: "", address: "", region: "", city: "", postal: "", lga: "", manager: "" },
  });
  const country = watch("country");

  return (
    <>
      <OwnerPageHeader title="Add warehouse" description="The address fields change with the country, matching each local format." />
      <form onSubmit={handleSubmit((v) => console.log(v))}>
        <Card className="max-w-3xl">
          <CardHeader><CardTitle>Warehouse details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <OwnerField label="Warehouse name" error={errors.name?.message}><Input {...register("name")} /></OwnerField>
            <OwnerField label="Country" error={errors.country?.message}>
              <Controller name="country" control={control} render={({ field }) => (
                <Select items={countryItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                  <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>{countryItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </OwnerField>
            <OwnerField label="Address" error={errors.address?.message} className="sm:col-span-2"><Input {...register("address")} /></OwnerField>
            {(countryFields[country] ?? []).map((f) => (
              <OwnerField key={f.key} label={f.label} error={errors[f.key]?.message}><Input {...register(f.key)} /></OwnerField>
            ))}
            <OwnerField label="Warehouse manager"><Input {...register("manager")} /></OwnerField>
            <div className="sm:col-span-2"><Button type="submit" disabled={isSubmitting}>Add warehouse</Button></div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}