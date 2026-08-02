"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal, X } from "lucide-react"

export type AdvancedSearchValue = {
  trackingNumber: string
  route: string
  date: string
}

type AdvancedSearchProps = {
  value: AdvancedSearchValue
  onChange: (value: AdvancedSearchValue) => void
  onReset: () => void
}

export default function AdvancedSearch({ value, onChange, onReset }: AdvancedSearchProps) {
  const [open, setOpen] = useState(false)
  const hasActiveFilters = !!(value.trackingNumber || value.route || value.date)

  return (
    <div className="rounded-2xl border bg-background">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          Advanced search
          {hasActiveFilters && (
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Active
            </span>
          )}
        </span>
        <span className="text-xs text-muted-foreground">{open ? "Hide" : "Show"}</span>
      </button>

      {open && (
        <div className="grid gap-3 border-t p-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="tracking-number" className="text-xs text-muted-foreground">
              Tracking number
            </Label>
            <Input
              id="tracking-number"
              placeholder="UK-2024-000124"
              value={value.trackingNumber}
              onChange={(e) => onChange({ ...value, trackingNumber: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="route" className="text-xs text-muted-foreground">
              Route
            </Label>
            <Input
              id="route"
              placeholder="UK to Nigeria"
              value={value.route}
              onChange={(e) => onChange({ ...value, route: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-xs text-muted-foreground">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={value.date}
              onChange={(e) => onChange({ ...value, date: e.target.value })}
            />
          </div>

          <div className="flex items-end gap-2 sm:col-span-3">
            <Button size="sm" className="rounded-lg">
              <Search className="mr-2 h-3.5 w-3.5" /> Search
            </Button>
            {hasActiveFilters && (
              <Button size="sm" variant="ghost" className="rounded-lg" onClick={onReset}>
                <X className="mr-2 h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}