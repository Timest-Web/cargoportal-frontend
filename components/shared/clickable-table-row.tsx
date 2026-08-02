"use client"

import * as React from "react"
import { TableRow } from "@/components/ui/table"

type ClickableTableRowProps = {
  onClick: () => void
  children: React.ReactNode
}

export default function ClickableTableRow({ onClick, children }: ClickableTableRowProps) {
  return (
    <TableRow className="cursor-pointer" onClick={onClick}>
      {children}
    </TableRow>
  )
}