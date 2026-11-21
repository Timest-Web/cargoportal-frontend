import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground">Platform administration</span>
          <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-success" /> Live data
          </span>
        </header>
        <main className="flex-1 space-y-5 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}