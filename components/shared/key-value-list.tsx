import * as React from "react"

export type KeyValueRow = {
  label: string
  value: React.ReactNode
}

type KeyValueListProps = {
  rows: KeyValueRow[]
  total?: KeyValueRow
  className?: string
}

export default function KeyValueList({ rows, total, className }: KeyValueListProps) {
  return (
    <div className={`divide-y rounded-xl border ${className ?? ""}`}>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between px-4 py-3 text-sm">
          <span className="text-muted-foreground">{row.label}</span>
          <span className="font-medium tabular-nums">{row.value}</span>
        </div>
      ))}
      {total && (
        <div className="flex items-center justify-between bg-muted/40 px-4 py-3 text-sm font-medium">
          <span>{total.label}</span>
          <span className="tabular-nums">{total.value}</span>
        </div>
      )}
    </div>
  )
}