import {
  LayoutDashboard, Package, Users, Warehouse, UserCog, CalendarClock,
  Truck, Wallet, FileText, FolderOpen, BarChart3, Settings, UsersRound,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { title: string; href: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

export const ownerNav: NavGroup[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      { title: "Shipments", href: "/owner/shipments", icon: Package },
      { title: "Customers", href: "/owner/customers", icon: Users },
      { title: "Warehouses", href: "/owner/warehouses", icon: Warehouse },
      { title: "Pickups", href: "/owner/pickups", icon: CalendarClock },
      { title: "Deliveries", href: "/owner/deliveries", icon: Truck },
    ],
  },
  {
    label: "Money",
    items: [
      { title: "Finance", href: "/owner/finance", icon: Wallet },
      { title: "Invoices", href: "/owner/invoices", icon: FileText },
    ],
  },
  {
    label: "Team",
    items: [
      { title: "Staff", href: "/owner/staff", icon: UsersRound },
      { title: "Agents", href: "/owner/agents", icon: UserCog },
    ],
  },
  {
    label: "Records",
    items: [
      { title: "Documents", href: "/owner/documents", icon: FolderOpen },
      { title: "Reports", href: "/owner/reports", icon: BarChart3 },
      { title: "Settings", href: "/owner/settings", icon: Settings },
    ],
  },
];