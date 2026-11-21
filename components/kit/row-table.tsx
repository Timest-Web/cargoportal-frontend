"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tones, type Tone } from "./tones";

export type Column<T> = { key: string; header: string; cell: (row: T) => React.ReactNode; align?: "right"; hide?: "md" | "lg" };
const hideCls = { md: "hidden md:table-cell", lg: "hidden lg:table-cell" };

/**
 * Floating-row table: every row is its own rounded card with a gap between rows,
 * an optional coloured status bar on the left, hover highlight and built-in paging.
 */
export function RowTable<T>({
  columns, rows, rowKey, accent, pageSize = 8, toolbar, empty = "Nothing to show yet.",
}: {
  columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string; accent?: (row: T) => Tone;
  pageSize?: number; toolbar?: React.ReactNode; empty?: string;
}) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pages - 1);
  const slice = rows.slice(current * pageSize, (current + 1) * pageSize);

  return (
    <div className="space-y-3">
      {toolbar}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} className={cn("px-4 pb-1 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground", c.align === "right" && "text-right", c.hide && hideCls[c.hide])}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 && (
              <tr><td colSpan={columns.length} className="rounded-xl border border-dashed py-12 text-center text-muted-foreground">{empty}</td></tr>
            )}
            {slice.map((row) => (
              <tr key={rowKey(row)} className="group">
                {columns.map((c, i) => (
                  <td
                    key={c.key}
                    className={cn(
                      "border-y bg-card px-4 py-3.5 transition-colors group-hover:bg-accent/60 last:rounded-r-xl last:border-r",
                      i === 0 && "rounded-l-xl",
                      i === 0 && (accent ? cn("border-l-4", tones[accent(row)].borderL) : "border-l"),
                      c.align === "right" && "text-right",
                      c.hide && hideCls[c.hide]
                    )}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > pageSize && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {current * pageSize + 1}–{Math.min((current + 1) * pageSize, rows.length)} of {rows.length}</span>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="outline" aria-label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)}><ChevronLeft /></Button>
            <span className="px-2">{current + 1} / {pages}</span>
            <Button size="icon" variant="outline" aria-label="Next page" disabled={current >= pages - 1} onClick={() => setPage(current + 1)}><ChevronRight /></Button>
          </div>
        </div>
      )}
    </div>
  );
}