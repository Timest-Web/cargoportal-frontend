import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LinkButton from "@/components/shared/link-button"
import { type LucideIcon } from "lucide-react"

type PlaceholderCardProps = {
  cardTitle: React.ReactNode
  title: string
  description: string
  icon?: LucideIcon
  actionHref?: string
  actionLabel?: string
  className?: string
}

export default function PlaceholderCard({
  cardTitle,
  title,
  description,
  icon: Icon,
  actionHref,
  actionLabel = "Open",
  className,
}: PlaceholderCardProps) {
  return (
    <Card className={`rounded-2xl ${className ?? ""}`}>
      <CardHeader>
        <CardTitle className="text-base">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-slate-50 to-slate-100 p-5">
          <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="relative space-y-2">
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
              <p className="text-sm font-medium">{title}</p>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>

            {actionHref && (
              <LinkButton href={actionHref} variant="outline" className="rounded-xl">
                {actionLabel}
              </LinkButton>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}