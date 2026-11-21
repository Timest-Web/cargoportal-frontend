import {
  LayoutDashboard, Building2, CreditCard, Route, Calculator, Megaphone, LifeBuoy, BarChart3,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { title: string; href: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

export const adminNav: NavGroup[] = [
  { label: "Overview", items: [{ title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }] },
  {
    label: "Platform",
    items: [
      { title: "Cargo companies", href: "/admin/companies", icon: Building2 },
      { title: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
      { title: "Routes", href: "/admin/routes", icon: Route },
      { title: "Pricing engine", href: "/admin/pricing", icon: Calculator },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Communication", href: "/admin/communication", icon: Megaphone },
      { title: "Support", href: "/admin/support", icon: LifeBuoy },
    ],
  },
  { label: "Insights", items: [{ title: "Reports", href: "/admin/reports", icon: BarChart3 }] },
];