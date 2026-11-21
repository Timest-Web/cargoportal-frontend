"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { tones } from "@/components/kit/tones";
import { naira, plans } from "@/lib/mock/admin";
import { planTone } from "@/lib/plan-tone";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Enter the company name"),
  rcNumber: z.string().min(5, "Enter the RC number"),
  ownerName: z.string().min(2, "Enter the owner's full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  plan: z.string().min(1, "Choose a plan"),
});
type FormValues = z.infer<typeof schema>;

export default function NewCompanyPage() {
  const { register, watch, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", rcNumber: "", ownerName: "", email: "", phone: "", plan: "Trial" },
  });
  const plan = watch("plan");

  return (
    <>
      <OwnerPageHeader title="Create cargo company" description="The owner gets an email to verify their address and finish setup." />
      <form onSubmit={handleSubmit((v) => console.log(v))} className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader><CardTitle>Company details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <OwnerField label="Company name" error={errors.name?.message}><Input {...register("name")} /></OwnerField>
            <OwnerField label="RC number" error={errors.rcNumber?.message}><Input {...register("rcNumber")} /></OwnerField>
            <OwnerField label="Owner's full name" error={errors.ownerName?.message}><Input {...register("ownerName")} /></OwnerField>
            <OwnerField label="Owner's email" error={errors.email?.message}><Input type="email" {...register("email")} /></OwnerField>
            <OwnerField label="Phone" error={errors.phone?.message} className="sm:col-span-2"><Input type="tel" {...register("phone")} /></OwnerField>
            <div className="sm:col-span-2"><Button type="submit" disabled={isSubmitting}>Create company</Button></div>
          </CardContent>
        </Card>

        <div className="space-y-3 lg:col-span-2">
          <p className="text-sm font-medium">Starting plan</p>
          {plans.map((p) => {
            const t = tones[planTone[p.name]];
            const selected = plan === p.name;
            return (
              <button
                key={p.name} type="button" onClick={() => setValue("plan", p.name, { shouldValidate: true })}
                className={cn("relative flex w-full items-center justify-between overflow-hidden rounded-2xl p-4 text-left transition-all", t.solid, selected ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : "opacity-80 hover:opacity-100")}
              >
                <span className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-white/10" />
                <span className="relative">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="block text-xs opacity-85">{p.staff} · {p.shipments}</span>
                </span>
                <span className="relative flex items-center gap-2 text-sm font-medium">
                  {p.price ? `${naira(p.price)}/mo` : "Free"}
                  {selected && <span className="flex size-5 items-center justify-center rounded-full bg-white/25"><Check className="size-3" /></span>}
                </span>
              </button>
            );
          })}
          {errors.plan && <p className="text-xs text-destructive">{errors.plan.message}</p>}
        </div>
      </form>
    </>
  );
}