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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FundWalletInput,
  fundWalletSchema,
  type FundWalletValues,
} from "@/lib/validations/wallet";

type FundWalletDialogProps = {
  onFund: (values: FundWalletValues) => void;
};

export default function FundWalletDialog({ onFund }: FundWalletDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<FundWalletInput, unknown, FundWalletValues>({
    resolver: zodResolver(fundWalletSchema),
  });

  function onSubmit(values: FundWalletValues) {
    onFund(values);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <Plus className="h-4 w-4" /> Fund Wallet
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Fund wallet</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input
              id="amount"
              type="number"
              min={100}
              placeholder="10000"
              {...form.register("amount")}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-destructive">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Payment method</Label>
            <Select
              onValueChange={(v) =>
                form.setValue("method", v as FundWalletValues["method"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Debit card</SelectItem>
                <SelectItem value="bank_transfer">Bank transfer</SelectItem>
                <SelectItem value="ussd">USSD</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.method && (
              <p className="text-sm text-destructive">
                {form.formState.errors.method.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full rounded-xl">
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
