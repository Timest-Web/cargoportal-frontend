"use client"

import { useState } from "react"

import PageHeader from "@/components/shared/page-header"
import FilterTabs from "@/components/shared/filter-tabs"
import NotificationFeed, { type NotificationItem } from "@/components/shared/notification-feed"

type Channel = "Email" | "SMS" | "WhatsApp" | "System"

const allNotifications: (NotificationItem & { channel: Channel })[] = [
  { id: "n1", channel: "System", category: "Shipment Updates", title: "Your shipment departed origin", description: "UK-2024-000124 has left the UK facility.", timestamp: "2h ago", read: false },
  { id: "n2", channel: "Email", category: "Payment Alerts", title: "Invoice INV-2026-0142 is due soon", description: "Due August 5, 2026.", timestamp: "5h ago", read: false },
  { id: "n3", channel: "SMS", category: "Delivery Alerts", title: "Out for delivery", description: "USA-2024-000061 is out for delivery today.", timestamp: "1d ago", read: true },
  { id: "n4", channel: "WhatsApp", category: "Shipment Updates", title: "Package received at warehouse", description: "CN-2024-000019 arrived at the sorting facility.", timestamp: "2d ago", read: true },
  { id: "n5", channel: "System", category: "Payment Alerts", title: "Wallet funded", description: "₦50,000 added to your wallet.", timestamp: "3d ago", read: true },
]

const channels = [
  { label: "Email", value: "Email" },
  { label: "SMS", value: "SMS" },
  { label: "WhatsApp", value: "WhatsApp" },
  { label: "System", value: "System" },
]

export default function NotificationsPage() {
  const [channel, setChannel] = useState<Channel>("System")
  const [notifications, setNotifications] = useState(allNotifications)

  const filtered = notifications.filter((n) => n.channel === channel)

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="Updates about your shipments, payments, and deliveries" />

      <FilterTabs
        options={channels.map((c) => ({
          ...c,
          count: notifications.filter((n) => n.channel === c.value && !n.read).length || undefined,
        }))}
        value={channel}
        onChange={(v) => setChannel(v as Channel)}
      />

      <NotificationFeed items={filtered} onMarkRead={markRead} emptyState="No notifications on this channel." />
    </div>
  )
}