"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OwnerField } from "@/components/owner/field";

type FieldDef = { name: string; label: string; type?: "text" | "password" | "number"; placeholder?: string };

export function ConfigForm({
  title, description, fields, defaults = {}, submitLabel = "Save configuration", extra,
}: { title: string; description: string; fields: FieldDef[]; defaults?: Record<string, string>; submitLabel?: string; extra?: React.ReactNode }) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<Record<string, string>>({ defaultValues: defaults });

  return (
    <form onSubmit={handleSubmit((v) => console.log(v))}>
      <Card>
        <CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {fields.map((f) => (
            <OwnerField key={f.name} label={f.label} error={errors[f.name]?.message as string | undefined}>
              <Input type={f.type ?? "text"} placeholder={f.placeholder} autoComplete="off" {...register(f.name, { required: "Required" })} />
            </OwnerField>
          ))}
          {extra}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
            {isSubmitSuccessful && <span className="text-sm text-muted-foreground">Saved.</span>}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}