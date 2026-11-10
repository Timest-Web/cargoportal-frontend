"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ownerNav } from "@/config/nav/owner";

export function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <Link href="/owner/dashboard" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Plane className="size-4" />
          </span>
          <span className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Cargo Portal</span>
            <span className="text-xs text-sidebar-foreground/60">Owner workspace</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {ownerNav.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      tooltip={item.title}
                      isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-3 py-3 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
        Premium plan · renews 12 Dec
      </SidebarFooter>
    </Sidebar>
  );
}