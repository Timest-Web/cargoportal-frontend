"use client"

type FilterOption = {
  label: string
  value: string
  count?: number
}

type FilterTabsProps = {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function FilterTabs({ options, value, onChange, className }: FilterTabsProps) {
  return (
    <div className={`inline-flex items-center gap-1 rounded-xl border bg-muted/40 p-1 ${className ?? ""}`}>
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span className="ml-1.5 text-xs text-muted-foreground">{opt.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}