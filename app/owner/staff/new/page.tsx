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
import { rolePermissions, staffRoles, type StaffRole } from "@/lib/mock/money-team";
import { warehouses } from "@/lib/mock/operations";

const schema = z.object({
  name: z.string().min(2, "Enter the staff member's full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  role: z.string().min(1, "Choose a role"),
  warehouse: z.string().min(1, "Choose a location"),
});
type FormValues = z.infer<typeof schema>;
const roleItems = staffRoles.map((r) => ({ value: r, label: r }));
const warehouseItems = warehouses.map((w) => ({ value: w.id, label: `${w.name} (${w.country})` }));

export default function NewStaffPage() {
  const { register, control, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", role: "", warehouse: "" },
  });
  const role = watch("role") as StaffRole;

  return (
    <>
      <OwnerPageHeader title="Add staff" description="They receive an email invite to set their own password." />
      <form onSubmit={handleSubmit((v) => console.log(v))}>
        <Card className="max-w-3xl">
          <CardHeader><CardTitle>Staff details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <OwnerField label="Full name" error={errors.name?.message} className="sm:col-span-2"><Input {...register("name")} /></OwnerField>
            <OwnerField label="Email" error={errors.email?.message}><Input type="email" {...register("email")} /></OwnerField>
            <OwnerField label="Phone" error={errors.phone?.message}><Input type="tel" {...register("phone")} /></OwnerField>
            <OwnerField label="Role" error={errors.role?.message}>
              <Controller name="role" control={control} render={({ field }) => (
                <Select items={roleItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>{roleItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
              {role && rolePermissions[role] && <p className="text-xs text-muted-foreground">{rolePermissions[role]}</p>}
            </OwnerField>
            <OwnerField label="Works from" error={errors.warehouse?.message}>
              <Controller name="warehouse" control={control} render={({ field }) => (
                <Select items={warehouseItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                  <SelectTrigger><SelectValue placeholder="Select warehouse" /></SelectTrigger>
                  <SelectContent>{warehouseItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </OwnerField>
            <div className="sm:col-span-2"><Button type="submit" disabled={isSubmitting}>Send invite</Button></div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}