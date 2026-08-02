/* eslint-disable react/no-unescaped-entities */
"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES, type ShipmentFormValues } from "@/lib/validations/shipment"

export default function PackageDetailsStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ShipmentFormValues>()

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-medium">Package details</h3>
        <p className="text-sm text-muted-foreground">Tell us what you're shipping.</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Package description</Label>
        <Input id="description" placeholder="e.g. Laptop and accessories" {...register("description")} />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" type="number" step="0.1" placeholder="2.5" {...register("weight")} />
          {errors.weight && <p className="text-sm text-destructive">{errors.weight.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select
            value={watch("category")}
            onValueChange={(v) => setValue("category", v as ShipmentFormValues["category"], { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Dimensions (cm)</Label>
        <div className="grid grid-cols-3 gap-3">
          <Input placeholder="Length" type="number" {...register("length")} />
          <Input placeholder="Width" type="number" {...register("width")} />
          <Input placeholder="Height" type="number" {...register("height")} />
        </div>
        {(errors.length || errors.width || errors.height) && (
          <p className="text-sm text-destructive">Enter all three dimensions</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="value">Declared value (₦)</Label>
        <Input id="value" type="number" placeholder="50000" {...register("value")} />
        {errors.value && <p className="text-sm text-destructive">{errors.value.message}</p>}
      </div>
    </div>
  )
}