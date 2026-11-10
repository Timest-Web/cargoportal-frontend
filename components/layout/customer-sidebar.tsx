"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar as useShadcnSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { customerNavSections } from "@/config/nav/customer"

export default function CustomerSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isMobile, setOpenMobile } = useShadcnSidebar()

  const isActive = React.useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + "/"),
    [pathname]
  )

  const onNavigate =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.defaultPrevented) return
      if (e.button !== 0) return
      if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return

      e.preventDefault()
      router.push(href)
      if (isMobile) setOpenMobile(false)
    }

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r border-white/5 text-slate-50",
        "bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900"
      )}
    >
      {/* Header */}
      <SidebarHeader className="border-b border-white/5">
        <div className="relative flex h-16 items-center gap-3 px-4 overflow-hidden">
          {/* Decorative blob */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl" />

          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/25" />
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-semibold tracking-tight">Cargo Portal</div>
            <div className="text-xs text-slate-300">Customer Portal</div>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="relative px-2 py-3">
        {/* Subtle dotted texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="relative space-y-5">
          {customerNavSections.map((section, sectionIndex) => (
            <div key={section.label} className="space-y-2">
              {/* Section label */}
              <div className="px-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 group-data-[collapsible=icon]:hidden">
                  {section.label}
                </p>
              </div>

              {/* Section items */}
              <SidebarMenu className="gap-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)

                  return (
                    <SidebarMenuItem key={item.href} className="relative">
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={active}
                        className={cn(
                          "relative rounded-xl px-3 py-2",
                          "text-slate-200 hover:text-white",
                          "hover:bg-white/5 active:bg-white/10",
                          "transition-colors",
                          active &&
                            "bg-emerald-500/10 text-white ring-1 ring-emerald-500/15"
                        )}
                        render={
                          <a
                            href={item.href}
                            onClick={onNavigate(item.href)}
                            className="relative"
                          >
                            {/* Active indicator */}
                            <span
                              className={cn(
                                "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-emerald-400 transition-opacity",
                                active ? "opacity-100" : "opacity-0"
                              )}
                            />

                            <Icon
                              className={cn(
                                "h-4 w-4",
                                active ? "text-emerald-200" : "text-slate-300"
                              )}
                            />
                            <span>{item.title}</span>
                          </a>
                        }
                      />
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>

              {/* Separator between sections */}
              {sectionIndex !== customerNavSections.length - 1 ? (
                <div className="px-2 pt-2">
                  <SidebarSeparator className="bg-white/5" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-white/5 p-3">
        <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-800 ring-1 ring-white/10" />
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <div className="truncate text-sm font-medium">John Doe</div>
              <div className="truncate text-xs text-slate-300">
                customer@email.com
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail className="bg-transparent" />
    </Sidebar>
  )
}