/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { smsUsage } from "@/lib/mock/admin-ops";

export function SmsCredits() {
  const [balance, setBalance] = useState(184200);
  const [topUp, setTopUp] = useState("");
  const max = Math.max(...smsUsage.map((d) => d.sent));
  const used = smsUsage.reduce((n, d) => n + d.sent, 0);

  return (
    <Card>
      <CardHeader><CardTitle>Credit management</CardTitle><CardDescription>One credit sends one SMS. At this week's pace, your balance lasts about {Math.floor(balance / (used / 7))} days.</CardDescription></CardHeader>
      <CardContent className="space-y-5">
        <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Balance</p><p className="text-3xl font-semibold">{balance.toLocaleString()}</p></div>
        <div className="flex gap-2">
          <Input type="number" placeholder="Credits to add" value={topUp} onChange={(e) => setTopUp(e.target.value)} />
          <Button disabled={!Number(topUp)} onClick={() => { setBalance((b) => b + Number(topUp)); setTopUp(""); }}>Top up</Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Sent this week</p>
          {smsUsage.map((d) => (
            <div key={d.day} className="flex items-center gap-3 text-xs">
              <span className="w-8 text-muted-foreground">{d.day}</span>
              <div className="h-1.5 flex-1 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${(d.sent / max) * 100}%` }} /></div>
              <span className="w-12 text-right">{d.sent.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}