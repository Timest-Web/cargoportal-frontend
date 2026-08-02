import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LinkButton from "@/components/shared/link-button"
import ClickableTableRow from "@/components/shared/clickable-table-row"

export type DataTableColumn<T> = {
  key: string
  header: React.ReactNode
  render: (row: T) => React.ReactNode
  align?: "left" | "right"
  className?: string
  headClassName?: string
}

type DataTableCardProps<T> = {
  title: React.ReactNode
  columns: DataTableColumn<T>[]
  data: T[]
  rowKey: (row: T) => string
  viewAllHref?: string
  viewAllLabel?: string
  onRowClick?: (row: T) => void
  footer?: React.ReactNode
  emptyState?: React.ReactNode
  className?: string
}

export default function DataTableCard<T>({
  title,
  columns,
  data,
  rowKey,
  viewAllHref,
  viewAllLabel = "View all",
  onRowClick,
  footer,
  emptyState,
  className,
}: DataTableCardProps<T>) {
  return (
    <Card className={`rounded-2xl ${className ?? ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{title}</CardTitle>
        {viewAllHref && (
          <LinkButton href={viewAllHref} variant="outline" className="rounded-xl">
            {viewAllLabel}
          </LinkButton>
        )}
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={
                      col.headClassName ??
                      (col.align === "right" ? "text-right" : undefined)
                    }
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 && emptyState ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {emptyState}
                  </TableCell>
                </TableRow>
              ) : onRowClick ? (
                data.map((row) => (
                  <ClickableTableRow key={rowKey(row)} onClick={() => onRowClick(row)}>
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        className={
                          col.className ??
                          (col.align === "right" ? "text-right font-medium" : undefined)
                        }
                      >
                        {col.render(row)}
                      </TableCell>
                    ))}
                  </ClickableTableRow>
                ))
              ) : (
                data.map((row) => (
                  <TableRow key={rowKey(row)}>
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        className={
                          col.className ??
                          (col.align === "right" ? "text-right font-medium" : undefined)
                        }
                      >
                        {col.render(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {footer && (
          <>
            <Separator className="my-4" />
            {footer}
          </>
        )}
      </CardContent>
    </Card>
  )
}