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
import { agentTypes } from "@/lib/mock/money-team";

const schema = z.object({
  name: z.string().min(2, "Enter the agent's full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  type: z.string().min(1, "Choose an agent type"),
  commissionRate: z.number({ message: "Enter a percentage" }).min(0, "Cannot be negative").max(100, "Cannot exceed 100"),
});
type FormValues = z.infer<typeof schema>;
const typeItems = agentTypes.map((t) => ({ value: t, label: t }));

export default function NewAgentPage() {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", type: "", commissionRate: 5 },
  });

  return (
    <>
      <OwnerPageHeader title="Add agent" description="The agent gets an invite to register and update packages in their country." />
      <form onSubmit={handleSubmit((v) => console.log(v))}>
        <Card className="max-w-3xl">
          <CardHeader><CardTitle>Agent details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <OwnerField label="Full name" error={errors.name?.message} className="sm:col-span-2"><Input {...register("name")} /></OwnerField>
            <OwnerField label="Email" error={errors.email?.message}><Input type="email" {...register("email")} /></OwnerField>
            <OwnerField label="Phone" error={errors.phone?.message}><Input type="tel" {...register("phone")} /></OwnerField>
            <OwnerField label="Agent type" error={errors.type?.message}>
              <Controller name="type" control={control} render={({ field }) => (
                <Select items={typeItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{typeItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </OwnerField>
            <OwnerField label="Commission rate (%)" error={errors.commissionRate?.message}><Input type="number" step="0.1" {...register("commissionRate", { valueAsNumber: true })} /></OwnerField>
            <div className="sm:col-span-2"><Button type="submit" disabled={isSubmitting}>Send invite</Button></div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}