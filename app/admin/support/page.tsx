"use client";

import { useState } from "react";
import { CircleAlert, Clock, MessageCircle, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerStatCard } from "@/components/owner/stat-card";
import { AdminStatusBadge } from "@/components/admin/status-badge";
import { chatLogs, supportAgents, ticketsSeed, type TicketStatus } from "@/lib/mock/admin-ops";
import { cn } from "@/lib/utils";

const agentItems = supportAgents.map((a) => ({ value: a, label: a }));
const filters = ["All", "Open", "In progress", "Resolved"] as const;

export default function SupportPage() {
  const [tickets, setTickets] = useState(ticketsSeed);
  const [filter, setFilter] = useState<string>("All");
  const [chatId, setChatId] = useState(chatLogs[0].id);

  const rows = tickets.filter((t) => filter === "All" || t.status === filter);
  const patch = (id: string, p: Partial<(typeof tickets)[number]>) => setTickets((all) => all.map((t) => (t.id === id ? { ...t, ...p } : t)));
  const n = (s: TicketStatus) => tickets.filter((t) => t.status === s).length;
  const chat = chatLogs.find((c) => c.id === chatId)!;

  return (
    <>
      <OwnerPageHeader title="Support" description="Tickets and chat conversations from cargo companies." />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <OwnerStatCard label="Open" value={String(n("Open"))} icon={Ticket} tone="warning" />
        <OwnerStatCard label="In progress" value={String(n("In progress"))} icon={Clock} tone="info" />
        <OwnerStatCard label="Urgent" value={String(tickets.filter((t) => t.priority === "Urgent" && t.status !== "Resolved").length)} icon={CircleAlert} tone="destructive" />
        <OwnerStatCard label="Resolved" value={String(n("Resolved"))} icon={MessageCircle} tone="primary" />
      </div>

      <Tabs defaultValue="tickets">
        <TabsList><TabsTrigger value="tickets">Tickets</TabsTrigger><TabsTrigger value="chats">Chat logs</TabsTrigger></TabsList>

        <TabsContent value="tickets" className="mt-4 space-y-4">
          <Tabs value={filter} onValueChange={(v) => setFilter(v ?? "All")}>
            <TabsList>{filters.map((f) => <TabsTrigger key={f} value={f}>{f}</TabsTrigger>)}</TabsList>
          </Tabs>
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader><TableRow><TableHead>Ticket</TableHead><TableHead className="hidden md:table-cell">Company</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Assignee</TableHead><TableHead className="w-24" /></TableRow></TableHeader>
                <TableBody>
                  {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No tickets in this view.</TableCell></TableRow>}
                  {rows.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell><p className="font-medium">{t.subject}</p><p className="text-xs text-muted-foreground">{t.id} · {t.created}</p></TableCell>
                      <TableCell className="hidden md:table-cell">{t.company}</TableCell>
                      <TableCell><AdminStatusBadge status={t.priority} /></TableCell>
                      <TableCell><AdminStatusBadge status={t.status} /></TableCell>
                      <TableCell className="w-44">
                        <Select items={agentItems} value={t.assignee} onValueChange={(v) => v && patch(t.id, { assignee: v, status: t.status === "Open" ? "In progress" : t.status })}>
                          <SelectTrigger><SelectValue placeholder="Assign" /></SelectTrigger>
                          <SelectContent>{agentItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">{t.status !== "Resolved" && <Button size="sm" variant="outline" onClick={() => patch(t.id, { status: "Resolved" })}>Resolve</Button>}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chats" className="mt-4 grid gap-4 lg:grid-cols-3">
          <Card><CardContent className="space-y-1 p-3">
            {chatLogs.map((c) => (
              <button key={c.id} onClick={() => setChatId(c.id)} className={cn("w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent", c.id === chatId && "bg-accent")}>
                <p className="font-medium">{c.company}</p><p className="text-xs text-muted-foreground">{c.agent} · {c.when}</p>
              </button>
            ))}
          </CardContent></Card>
          <Card className="lg:col-span-2"><CardContent className="space-y-3 p-5">
            <p className="text-sm font-medium">{chat.company} <span className="font-normal text-muted-foreground">with {chat.agent}</span></p>
            {chat.messages.map((m, i) => (
              <div key={i} className={cn("max-w-[80%] rounded-2xl px-4 py-2.5 text-sm", m.from === "agent" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted")}>{m.text}</div>
            ))}
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </>
  );
}