"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OwnerField } from "@/components/owner/field";

const schema = z.object({
  gateway: z.string().min(1, "Choose a gateway"),
  publicKey: z.string().min(8, "Enter your public key"),
  secretKey: z.string().min(8, "Enter your secret key"),
  testMode: z.boolean(),
});
type FormValues = z.infer<typeof schema>;
const gatewayItems = [{ value: "paystack", label: "Paystack" }, { value: "flutterwave", label: "Flutterwave" }];

export function PaymentForm() {
  const { register, control, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { gateway: "", publicKey: "", secretKey: "", testMode: true },
  });

  return (
    <form onSubmit={handleSubmit((v) => console.log(v))}>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Payment gateway</CardTitle>
          <CardDescription>Customers pay invoices and fund their wallets through this gateway.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <OwnerField label="Gateway" error={errors.gateway?.message}>
            <Controller name="gateway" control={control} render={({ field }) => (
              <Select items={gatewayItems} value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="Select gateway" /></SelectTrigger>
                <SelectContent>{gatewayItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
            )} />
          </OwnerField>
          <OwnerField label="Public key" error={errors.publicKey?.message}><Input autoComplete="off" {...register("publicKey")} /></OwnerField>
          <OwnerField label="Secret key" error={errors.secretKey?.message}><Input type="password" autoComplete="off" {...register("secretKey")} /></OwnerField>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" className="size-4 accent-[var(--primary)]" {...register("testMode")} />
            Test mode (no real money moves)
          </label>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>Save gateway</Button>
            {isSubmitSuccessful && <span className="text-sm text-muted-foreground">Saved.</span>}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}