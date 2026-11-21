import type { Report } from "./records";
import {
  companiesSeed,
  platformSeries,
  plans,
  routesSeed,
  subscriptionsSeed,
} from "./admin";

const live = subscriptionsSeed.filter((s) => s.status === "Active");
const totalMrr = live.reduce(
  (n, s) => n + (plans.find((p) => p.name === s.plan)?.price ?? 0),
  0,
);
const active = companiesSeed.filter((c) => c.status !== "Pending");

export const adminReports: Report[] = [
  {
    id: "revenue",
    label: "Revenue",
    description: "Platform revenue and shipments per month.",
    chartLabel: "Revenue",
    money: true,
    chart: platformSeries.map((m) => ({ name: m.month, value: m.revenue })),
    columns: [
      { key: "month", label: "Month" },
      { key: "revenue", label: "Revenue", money: true },
      { key: "companies", label: "Companies" },
      { key: "shipments", label: "Shipments" },
    ],
    rows: platformSeries.map((m) => ({
      month: m.month,
      revenue: m.revenue,
      companies: m.companies,
      shipments: m.uk + m.usa + m.china,
    })),
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    description: "Active subscriptions and MRR contribution per plan.",
    chartLabel: "MRR",
    money: true,
    chart: plans.map((p) => ({
      name: p.name,
      value: live.filter((s) => s.plan === p.name).length * p.price,
    })),
    columns: [
      { key: "plan", label: "Plan" },
      { key: "active", label: "Active" },
      { key: "mrr", label: "MRR", money: true },
      { key: "share", label: "Share of MRR" },
    ],
    rows: plans.map((p) => {
      const n = live.filter((s) => s.plan === p.name).length;
      return {
        plan: p.name,
        active: n,
        mrr: n * p.price,
        share: totalMrr
          ? `${Math.round(((n * p.price) / totalMrr) * 100)}%`
          : "0%",
      };
    }),
  },
  {
    id: "customers",
    label: "Customers",
    description: "Customer base per cargo company.",
    chartLabel: "Customers",
    chart: [...active]
      .sort((a, b) => b.customers - a.customers)
      .map((c) => ({ name: c.name.split(" ")[0], value: c.customers })),
    columns: [
      { key: "company", label: "Company" },
      { key: "customers", label: "Customers" },
      { key: "shipments", label: "Shipments" },
      { key: "perCustomer", label: "Shipments per customer" },
    ],
    rows: [...active]
      .sort((a, b) => b.customers - a.customers)
      .map((c) => ({
        company: c.name,
        customers: c.customers,
        shipments: c.shipments,
        perCustomer: c.customers ? (c.shipments / c.customers).toFixed(1) : "0",
      })),
  },
  {
    id: "shipments",
    label: "Shipments",
    description: "Volume and revenue by route.",
    chartLabel: "Shipments",
    chart: routesSeed.map((r) => ({ name: r.name, value: r.shipments })),
    columns: [
      { key: "route", label: "Route" },
      { key: "shipments", label: "Shipments" },
      { key: "transit", label: "Avg transit (days)" },
      { key: "revenue", label: "Revenue", money: true },
    ],
    rows: routesSeed.map((r) => ({
      route: r.name,
      shipments: r.shipments,
      transit: r.transitDays,
      revenue: r.revenue,
    })),
  },
];
