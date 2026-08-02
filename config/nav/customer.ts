import type React from "react"
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  MapPin,
  Truck,
  Wallet,
  FileText,
  Bell,
  Headphones,
  User,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export type NavSection = {
  label: string
  items: NavItem[]
}

export const customerNavSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Shipments",
    items: [
      { title: "My Shipments", href: "/customer/shipments", icon: Package },
      { title: "Create Shipment", href: "/customer/shipments/new", icon: PlusSquare },
      { title: "Track Shipment", href: "/customer/track", icon: MapPin },
      { title: "Pickup Requests", href: "/customer/pickups", icon: Truck },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Wallet", href: "/customer/wallet", icon: Wallet },
      { title: "Invoices", href: "/customer/invoices", icon: FileText },
    ],
  },
  {
    label: "Support",
    items: [
      { title: "Notifications", href: "/customer/notifications", icon: Bell },
      { title: "Support Tickets", href: "/customer/support", icon: Headphones },
    ],
  },
  {
    label: "Account",
    items: [{ title: "Profile", href: "/customer/profile", icon: User }],
  },
]

/**
 * Optional: keep a flat export too (if other parts of your app still use customerNav)
 */
export const customerNav: NavItem[] = customerNavSections.flatMap(
  (s) => s.items
)