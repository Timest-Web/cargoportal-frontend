"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerField } from "@/components/owner/field";
import { pricingSeed } from "@/lib/mock/records";

const amount = z.number({ message: "Required" }).min(0, "Cannot be negative");
const schema = z.object({
  rows: z.array(z.object({ route: z.string(), air: amount, sea: amount, pickup: amount })),
  customsPercent: z.number({ message: "Required" }).min(0).max(100),
  insurancePercent: z.number({ message: "Required" }).min(0).max(100),
});
type FormValues = z.infer<typeof schema>;

export function PricingForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { rows: pricingSeed, customsPercent: 12, insurancePercent: 2 },
  });
  const cellError = (i: number, k: "air" | "sea" | "pickup") => errors.rows?.[i]?.[k]?.message;

  return (
    <form onSubmit={handleSubmit((v) => console.log(v))} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Freight rates</CardTitle>
          <CardDescription>Amounts in naira. Air is charged per kg, sea per kg, and pickup is a flat fee per collection.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Route</TableHead><TableHead>Air (₦/kg)</TableHead><TableHead>Sea (₦/kg)</TableHead><TableHead>Pickup (₦)</TableHead></TableRow></TableHeader>
            <TableBody>
              {pricingSeed.map((r, i) => (
                <TableRow key={r.route}>
                  <TableCell className="font-medium">{r.route}</TableCell>
                  {(["air", "sea", "pickup"] as const).map((k) => (
                    <TableCell key={k}>
                      <Input type="number" className="w-32" aria-label={`${r.route} ${k}`} {...register(`rows.${i}.${k}`, { valueAsNumber: true })} />
                      {cellError(i, k) && <p className="mt-1 text-xs text-destructive">{cellError(i, k)}</p>}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="max-w-xl">
        <CardHeader><CardTitle>Customs and insurance</CardTitle><CardDescription>Applied on top of freight charges when an invoice is created.</CardDescription></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <OwnerField label="Customs charge (%)" error={errors.customsPercent?.message}><Input type="number" step="0.1" {...register("customsPercent", { valueAsNumber: true })} /></OwnerField>
          <OwnerField label="Insurance fee (%)" error={errors.insurancePercent?.message}><Input type="number" step="0.1" {...register("insurancePercent", { valueAsNumber: true })} /></OwnerField>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>Save pricing</Button>
        {isSubmitSuccessful && <span className="text-sm text-muted-foreground">Saved.</span>}
      </div>
    </form>
  );
}