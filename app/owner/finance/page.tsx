"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Plus, TrendingDown, TrendingUp, Wallet, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerPageHeader } from "@/components/owner/header";
import { OwnerField } from "@/components/owner/field";
import { OwnerStatCard } from "@/components/owner/stat-card";
import { naira } from "@/lib/mock/owner";
import { dailyRevenue, expenseCategories, expensesSeed, incomeEntries, invoiceTotal, invoices, monthlyFinance, type ExpenseCategory } from "@/lib/mock/money-team";

const monthlyConfig = {
  income: { label: "Income", color: "var(--primary)" },
  expenses: { label: "Expenses", color: "var(--info)" },
} satisfies ChartConfig;
const dailyConfig = { revenue: { label: "Revenue", color: "var(--primary)" } } satisfies ChartConfig;
const categoryItems = expenseCategories.map((c) => ({ value: c, label: c }));

export default function FinancePage() {
  const [expenses, setExpenses] = useState(expensesSeed);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");

  const income = incomeEntries.reduce((s, i) => s + i.amount, 0);
  const spent = expenses.reduce((s, e) => s + e.amount, 0);
  const outstanding = invoices.reduce((s, i) => s + invoiceTotal(i) - i.paid, 0);

  const addExpense = () => {
    if (!category || !amount) return;
    setExpenses((e) => [{ id: "EXP-" + (900 + e.length + 5), category: category as ExpenseCategory, note: note || category, amount: Number(amount), date: "2026-11-12" }, ...e]);
    setOpen(false); setCategory(""); setNote(""); setAmount("");
  };

  return (
    <>
      <OwnerPageHeader title="Finance" description="Income, expenses and profit for your company." actions={<Button onClick={() => setOpen(true)}><Plus /> Record expense</Button>} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OwnerStatCard label="Income this month" value={naira(21300000)} icon={TrendingUp} tone="primary" />
        <OwnerStatCard label="Expenses this month" value={naira(8400000)} icon={TrendingDown} tone="info" />
        <OwnerStatCard label="Profit this month" value={naira(21300000 - 8400000)} icon={Wallet} tone="wallet" />
        <OwnerStatCard label="Outstanding payments" value={naira(outstanding)} icon={CreditCard} tone="destructive" />
      </div>

      <Tabs defaultValue="income">
        <TabsList>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Recent income</CardTitle><CardDescription>Shipment charges, customs fees and insurance. Total shown: {naira(income)}</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Entry</TableHead><TableHead>Category</TableHead><TableHead>Reference</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                <TableBody>
                  {incomeEntries.map((i) => (
                    <TableRow key={i.id}><TableCell className="font-medium">{i.id}</TableCell><TableCell>{i.category}</TableCell><TableCell>{i.ref}</TableCell><TableCell>{i.date}</TableCell><TableCell className="text-right">{naira(i.amount)}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Expenses</CardTitle><CardDescription>Staff salaries, rent and logistics. Total shown: {naira(spent)}</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Entry</TableHead><TableHead>Category</TableHead><TableHead>Note</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                <TableBody>
                  {expenses.map((e) => (
                    <TableRow key={e.id}><TableCell className="font-medium">{e.id}</TableCell><TableCell>{e.category}</TableCell><TableCell>{e.note}</TableCell><TableCell>{e.date}</TableCell><TableCell className="text-right">{naira(e.amount)}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Monthly income and expenses</CardTitle><CardDescription>Profit is the gap between the two bars</CardDescription></CardHeader>
            <CardContent>
              <ChartContainer config={monthlyConfig} className="h-64 w-full">
                <BarChart data={monthlyFinance}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="income" fill="var(--color-income)" radius={6} />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" radius={6} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Daily revenue</CardTitle><CardDescription>This week</CardDescription></CardHeader>
            <CardContent>
              <ChartContainer config={dailyConfig} className="h-64 w-full">
                <BarChart data={dailyRevenue}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Outstanding payments</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Customer</TableHead><TableHead>Due</TableHead><TableHead className="text-right">Balance</TableHead></TableRow></TableHeader>
                <TableBody>
                  {invoices.filter((i) => invoiceTotal(i) - i.paid > 0).map((i) => (
                    <TableRow key={i.id}><TableCell className="font-medium">{i.id}</TableCell><TableCell>{i.customer}</TableCell><TableCell>{i.due}</TableCell><TableCell className="text-right">{naira(invoiceTotal(i) - i.paid)}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Record expense</DialogTitle><DialogDescription>Add a salary, rent or logistics cost.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <OwnerField label="Category">
              <Select items={categoryItems} value={category} onValueChange={(v) => setCategory(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{categoryItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
            </OwnerField>
            <OwnerField label="Note"><Input value={note} onChange={(e) => setNote(e.target.value)} /></OwnerField>
            <OwnerField label="Amount (₦)"><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></OwnerField>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!category || !amount} onClick={addExpense}>Save expense</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}