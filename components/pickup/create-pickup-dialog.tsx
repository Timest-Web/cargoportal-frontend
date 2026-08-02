"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PickupFormInput,
  pickupSchema,
  type PickupFormValues,
} from "@/lib/validations/pickup";

type CreatePickupDialogProps = {
  onCreate: (values: PickupFormValues) => void;
};

export default function CreatePickupDialog({
  onCreate,
}: CreatePickupDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<PickupFormInput, unknown, PickupFormValues>({
    resolver: zodResolver(pickupSchema),
  });

  function onSubmit(values: PickupFormValues) {
    onCreate(values);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <Plus className="h-4 w-4" /> Create pickup
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create pickup request</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="address">Pickup address</Label>
            <Textarea
              id="address"
              placeholder="12 Admiralty Way, Lekki Phase 1, Lagos"
              {...form.register("address")}
            />
            {form.formState.errors.address && (
              <p className="text-sm text-destructive">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...form.register("date")} />
              {form.formState.errors.date && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" {...form.register("time")} />
              {form.formState.errors.time && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.time.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="packageCount">Package count</Label>
            <Input
              id="packageCount"
              type="number"
              min={1}
              placeholder="1"
              {...form.register("packageCount")}
            />
            {form.formState.errors.packageCount && (
              <p className="text-sm text-destructive">
                {form.formState.errors.packageCount.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full rounded-xl">
              Submit request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
