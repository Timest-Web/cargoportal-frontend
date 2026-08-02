import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LinkButton from "@/components/shared/link-button"
import { type LucideIcon } from "lucide-react"

export type QuickAction = {
  label: string
  href: string
  icon: LucideIcon
  variant?: "default" | "secondary" | "outline"
}

type QuickActionsCardProps = {
  title?: React.ReactNode
  actions: QuickAction[]
  className?: string
}

export default function QuickActionsCard({
  title = "Quick Actions",
  actions,
  className,
}: QuickActionsCardProps) {
  return (
    <Card className={`rounded-2xl ${className ?? ""}`}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map(({ label, href, icon: Icon, variant = "secondary" }) => (
          <LinkButton
            key={href}
            href={href}
            variant={variant}
            className="h-11 justify-between rounded-xl"
          >
            {label} <Icon className="h-4 w-4" />
          </LinkButton>
        ))}
      </CardContent>
    </Card>
  )
}