"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminNav } from "@/config/nav/admin";

// Change this one number to recolour the whole admin sidebar (0-360 on the colour wheel).
// 285 = deep violet, 255 = indigo, 200 = teal, 25 = burgundy.
const HUE = 285;

const theme = {
  "--sidebar": `oklch(0.22 0.09 ${HUE})`,
  "--sidebar-foreground": `oklch(0.97 0.01 ${HUE})`,
  "--sidebar-primary": "oklch(0.78 0.17 160)",
  "--sidebar-primary-foreground": "oklch(0.2 0.05 160)",
  "--sidebar-accent": `oklch(0.32 0.11 ${HUE})`,
  "--sidebar-accent-foreground": `oklch(0.99 0.005 ${HUE})`,
  "--sidebar-border": `oklch(0.34 0.08 ${HUE})`,
  "--sidebar-ring": "oklch(0.78 0.17 160)",
  background: `linear-gradient(180deg, oklch(0.26 0.1 ${HUE}) 0%, oklch(0.18 0.08 ${HUE + 10}) 100%)`,
} as React.CSSProperties;

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      {/* The wrapper carries the palette, so it also applies in the mobile drawer. */}
      <div style={theme} className="relative flex min-h-0 flex-1 flex-col overflow-hidden text-sidebar-foreground">
        <span className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/[0.06] blur-2xl" />
        <span className="pointer-events-none absolute -bottom-20 -right-16 size-56 rounded-full bg-[oklch(0.78_0.17_160)]/10 blur-3xl" />

        <SidebarHeader className="relative px-3 py-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-black/20">
              <ShieldCheck className="size-4.5" />
            </span>
            <span className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-semibold">Cargo Portal</span>
              <span className="text-xs text-sidebar-foreground/60">Super admin</span>
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="relative">
          {adminNav.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          render={<Link href={item.href} />}
                          tooltip={item.title}
                          isActive={active}
                          className="text-sidebar-foreground/80 data-[active=true]:bg-white/15 data-[active=true]:font-medium data-[active=true]:text-white data-[active=true]:shadow-sm data-[active=true]:ring-1 data-[active=true]:ring-white/15 hover:bg-white/10 hover:text-white"
                        >
                          <item.icon className={active ? "text-sidebar-primary" : ""} />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="relative px-3 py-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-sidebar-foreground/80">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sidebar-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-sidebar-primary" />
            </span>
            All systems operational
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}