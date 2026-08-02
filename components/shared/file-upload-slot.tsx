"use client"

import { useRef } from "react"
import { UploadCloud, FileText, X } from "lucide-react"

type FileUploadSlotProps = {
  file: File | null
  onChange: (file: File | null) => void
  accept?: string
}

export default function FileUploadSlot({ file, onChange, accept = ".pdf,.jpg,.jpeg,.png" }: FileUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed p-6 text-center hover:border-primary/40"
        >
          <UploadCloud className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Click to upload</span>
          <span className="text-xs text-muted-foreground">PDF, JPG or PNG, up to 10MB</span>
        </button>
      ) : (
        <div className="flex items-center justify-between rounded-xl border p-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{file.name}</span>
          </div>
          <button type="button" onClick={() => onChange(null)}>
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}