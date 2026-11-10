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

const schema = z.object({
  fullName: z.string().min(2, "Enter the customer's full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  state: z.string().min(1, "Required"),
  lga: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  street: z.string().min(3, "Required"),
  postalCode: z.string().optional(),
  kycStatus: z.enum(["Pending", "Verified"]),
});
type FormValues = z.infer<typeof schema>;
const kycItems = [{ value: "Pending", label: "Pending review" }, { value: "Verified", label: "Verified" }];

export default function NewCustomerPage() {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", phone: "", state: "", lga: "", city: "", street: "", postalCode: "", kycStatus: "Pending" },
  });

  const onSubmit = (v: FormValues) => console.log(v);

  return (
    <>
      <OwnerPageHeader title="Add customer" description="Create a customer record. They can upload KYC documents from their own dashboard." />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Personal details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <OwnerField label="Full name" error={errors.fullName?.message} className="sm:col-span-2"><Input {...register("fullName")} /></OwnerField>
            <OwnerField label="Email" error={errors.email?.message}><Input type="email" {...register("email")} /></OwnerField>
            <OwnerField label="Phone" error={errors.phone?.message}><Input type="tel" placeholder="+234" {...register("phone")} /></OwnerField>
            <OwnerField label="State" error={errors.state?.message}><Input {...register("state")} /></OwnerField>
            <OwnerField label="LGA" error={errors.lga?.message}><Input {...register("lga")} /></OwnerField>
            <OwnerField label="City" error={errors.city?.message}><Input {...register("city")} /></OwnerField>
            <OwnerField label="Postal code"><Input {...register("postalCode")} /></OwnerField>
            <OwnerField label="Street address" error={errors.street?.message} className="sm:col-span-2"><Input {...register("street")} /></OwnerField>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader><CardTitle>KYC</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <OwnerField label="KYC status">
              <Controller name="kycStatus" control={control} render={({ field }) => (
                <Select items={kycItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "Pending")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{kycItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </OwnerField>
            <Button type="submit" className="w-full" disabled={isSubmitting}>Add customer</Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}