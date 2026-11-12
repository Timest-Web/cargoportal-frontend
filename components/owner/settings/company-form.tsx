"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OwnerField } from "@/components/owner/field";

const schema = z.object({
  name: z.string().min(2, "Enter your company name"),
  rcNumber: z.string().min(5, "Enter your RC number"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  address: z.string().min(3, "Enter the head office address"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  website: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function CompanyForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "Cargoportal Cargo", rcNumber: "RC1839204", email: "hello@cargoportal.ng", phone: "+234 801 234 5678", address: "Km 12, Airport Road", city: "Ikeja", state: "Lagos", website: "" },
  });

  return (
    <form onSubmit={handleSubmit((v) => console.log(v))}>
      <Card className="max-w-3xl">
        <CardHeader><CardTitle>Company profile</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <OwnerField label="Company name" error={errors.name?.message}><Input {...register("name")} /></OwnerField>
          <OwnerField label="RC number" error={errors.rcNumber?.message}><Input {...register("rcNumber")} /></OwnerField>
          <OwnerField label="Business email" error={errors.email?.message}><Input type="email" {...register("email")} /></OwnerField>
          <OwnerField label="Phone" error={errors.phone?.message}><Input type="tel" {...register("phone")} /></OwnerField>
          <OwnerField label="Head office address" error={errors.address?.message} className="sm:col-span-2"><Input {...register("address")} /></OwnerField>
          <OwnerField label="City" error={errors.city?.message}><Input {...register("city")} /></OwnerField>
          <OwnerField label="State" error={errors.state?.message}><Input {...register("state")} /></OwnerField>
          <OwnerField label="Website (optional)" className="sm:col-span-2"><Input placeholder="https://" {...register("website")} /></OwnerField>
          <div className="flex items-center gap-3 sm:col-span-2">
            <Button type="submit" disabled={isSubmitting}>Save changes</Button>
            {isSubmitSuccessful && <span className="text-sm text-muted-foreground">Saved.</span>}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}