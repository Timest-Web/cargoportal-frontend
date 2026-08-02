import PortalShell from "@/components/layout/portal-shell"
import CustomerSidebar from "@/components/layout/customer-sidebar"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PortalShell sidebar={<CustomerSidebar />}>{children}</PortalShell>
}