"use client"

import { useRef } from "react"
import { useFormContext } from "react-hook-form"
import { UploadCloud, FileText, X } from "lucide-react"
import type { ShipmentFormValues } from "@/lib/validations/shipment"

export default function InvoiceUploadStep() {
  const { watch, setValue } = useFormContext<ShipmentFormValues>()
  const inputRef = useRef<HTMLInputElement>(null)
  const file = watch("invoiceFile")

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-medium">Upload invoice</h3>
        <p className="text-sm text-muted-foreground">
          Optional — speeds up customs clearance. You can skip this and continue.
        </p>
      </div>

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed p-8 text-center hover:border-primary/40"
        >
          <UploadCloud className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm font-medium">Click to upload</span>
          <span className="text-xs text-muted-foreground">PDF, JPG or PNG, up to 10MB</span>
        </button>
      ) : (
        <div className="flex items-center justify-between rounded-xl border p-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{file.name}</span>
          </div>
          <button type="button" onClick={() => setValue("invoiceFile", null)}>
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => setValue("invoiceFile", e.target.files?.[0] ?? null)}
      />
    </div>
  )
}