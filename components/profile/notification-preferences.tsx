"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const CHANNELS = ["Email", "SMS", "WhatsApp", "System"] as const
const CATEGORIES = ["Shipment Updates", "Payment Alerts", "Delivery Alerts"] as const

type Prefs = Record<(typeof CATEGORIES)[number], Record<(typeof CHANNELS)[number], boolean>>

const defaultPrefs: Prefs = CATEGORIES.reduce((acc, category) => {
  acc[category] = CHANNELS.reduce((chAcc, channel) => {
    chAcc[channel] = channel === "System"
    return chAcc
  }, {} as Record<(typeof CHANNELS)[number], boolean>)
  return acc
}, {} as Prefs)

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs)

  function toggle(category: (typeof CATEGORIES)[number], channel: (typeof CHANNELS)[number]) {
    setPrefs((prev) => ({
      ...prev,
      [category]: { ...prev[category], [channel]: !prev[category][channel] },
    }))
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">Notification preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left font-medium text-muted-foreground">Category</th>
                {CHANNELS.map((c) => (
                  <th key={c} className="pb-3 text-center font-medium text-muted-foreground">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {CATEGORIES.map((category) => (
                <tr key={category}>
                  <td className="py-3">{category}</td>
                  {CHANNELS.map((channel) => (
                    <td key={channel} className="py-3 text-center">
                      <Switch
                        checked={prefs[category][channel]}
                        onCheckedChange={() => toggle(category, channel)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}