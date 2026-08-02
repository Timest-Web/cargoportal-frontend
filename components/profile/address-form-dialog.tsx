"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addressSchema, type AddressValues } from "@/lib/validations/profile"

type AddressFormDialogProps = {
  label: string
  defaultValues?: AddressValues | null
  onSave: (values: AddressValues) => void
}

export default function AddressFormDialog({ label, defaultValues, onSave }: AddressFormDialogProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<AddressValues>({ resolver: zodResolver(addressSchema) })

  useEffect(() => {
    if (open) form.reset(defaultValues ?? undefined)
  }, [open, defaultValues, form])

  function onSubmit(values: AddressValues) {
    onSave(values)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
        <Pencil className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{label} address</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="line1">Address</Label>
            <Input id="line1" placeholder="12 Admiralty Way, Lekki Phase 1" {...form.register("line1")} />
            {form.formState.errors.line1 && (
              <p className="text-sm text-destructive">{form.formState.errors.line1.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Lagos" {...form.register("city")} />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Lagos" {...form.register("state")} />
              {form.formState.errors.state && (
                <p className="text-sm text-destructive">{form.formState.errors.state.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full rounded-xl">
              Save address
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}