import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { OwnerSidebar } from "@/components/owner/sidebar";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <OwnerSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground">Cargo Portal</span>
        </header>
        <main className="flex-1 space-y-6 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}