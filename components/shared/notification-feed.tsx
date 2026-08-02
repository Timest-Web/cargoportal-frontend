import { Package, CreditCard, Truck } from "lucide-react"

const CATEGORY_ICON = {
  "Shipment Updates": Package,
  "Payment Alerts": CreditCard,
  "Delivery Alerts": Truck,
} as const

export type NotificationItem = {
  id: string
  category: keyof typeof CATEGORY_ICON
  title: string
  description: string
  timestamp: string
  read: boolean
}

type NotificationFeedProps = {
  items: NotificationItem[]
  onMarkRead?: (id: string) => void
  emptyState?: React.ReactNode
}

export default function NotificationFeed({ items, onMarkRead, emptyState }: NotificationFeedProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border py-12 text-center text-sm text-muted-foreground">
        {emptyState ?? "No notifications."}
      </div>
    )
  }

  return (
    <div className="divide-y rounded-2xl border bg-background">
      {items.map((item) => {
        const Icon = CATEGORY_ICON[item.category]
        return (
          <button
            key={item.id}
            onClick={() => onMarkRead?.(item.id)}
            className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40 ${
              !item.read ? "bg-primary/5" : ""
            }`}
          >
            <div
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                !item.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm ${!item.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {item.title}
                </p>
                <span className="shrink-0 text-xs text-muted-foreground">{item.timestamp}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{item.category}</span>
            </div>

            {!item.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </button>
        )
      })}
    </div>
  )
}