import { customers, routes, shipments } from "./owner";
import {
  agentsSeed,
  invoiceTotal,
  invoices,
  monthlyFinance,
} from "./money-team";

export const documentTypes = [
  "Airway Bill",
  "Customs Form",
  "Invoice",
  "Delivery Note",
  "Proof of Delivery",
] as const;
export type DocumentType = (typeof documentTypes)[number];

export const documentsSeed: {
  id: string;
  name: string;
  type: DocumentType;
  shipmentId: string;
  uploadedBy: string;
  date: string;
  size: string;
  url?: string;
}[] = [
  {
    id: "DOC-411",
    name: "AWB-176-4402.pdf",
    type: "Airway Bill",
    shipmentId: "SHP-10241",
    uploadedBy: "Daniel Cole",
    date: "2026-11-08",
    size: "212 KB",
  },
  {
    id: "DOC-410",
    name: "customs-declaration-10238.pdf",
    type: "Customs Form",
    shipmentId: "SHP-10238",
    uploadedBy: "Ngozi Obi",
    date: "2026-11-06",
    size: "384 KB",
  },
  {
    id: "DOC-408",
    name: "INV-2207.pdf",
    type: "Invoice",
    shipmentId: "SHP-10238",
    uploadedBy: "Bisi Ajayi",
    date: "2026-11-05",
    size: "96 KB",
  },
  {
    id: "DOC-402",
    name: "delivery-note-10235.pdf",
    type: "Delivery Note",
    shipmentId: "SHP-10235",
    uploadedBy: "Obinna Eze",
    date: "2026-11-02",
    size: "74 KB",
  },
  {
    id: "DOC-401",
    name: "pod-10235.jpg",
    type: "Proof of Delivery",
    shipmentId: "SHP-10235",
    uploadedBy: "Obinna Eze",
    date: "2026-11-02",
    size: "1.4 MB",
  },
];

export type ReportRow = Record<string, string | number>;
export type Report = {
  id: string;
  label: string;
  description: string;
  chartLabel: string;
  chart: { name: string; value: number }[];
  money?: boolean;
  columns: { key: string; label: string; money?: boolean }[];
  rows: ReportRow[];
};

const byRoute = routes.map((r) => {
  const list = shipments.filter((s) => s.route === r);
  return {
    route: r,
    shipments: list.length,
    air: list.filter((s) => s.type === "Air Cargo").length,
    sea: list.filter((s) => s.type === "Sea Cargo").length,
    revenue: list.reduce((n, s) => n + s.amount, 0),
  };
});

export const reports: Report[] = [
  {
    id: "shipments",
    label: "Shipments",
    description: "Volume by route and cargo type.",
    chartLabel: "Shipments",
    chart: byRoute.map((r) => ({ name: r.route, value: r.shipments })),
    columns: [
      { key: "route", label: "Route" },
      { key: "shipments", label: "Shipments" },
      { key: "air", label: "Air" },
      { key: "sea", label: "Sea" },
    ],
    rows: byRoute,
  },
  {
    id: "customers",
    label: "Customers",
    description: "Your busiest customers and their KYC state.",
    chartLabel: "Shipments",
    chart: customers.map((c) => ({
      name: c.name.split(" ")[0],
      value: c.shipments,
    })),
    columns: [
      { key: "name", label: "Customer" },
      { key: "shipments", label: "Shipments" },
      { key: "kyc", label: "KYC" },
      { key: "spend", label: "Total billed", money: true },
    ],
    rows: customers.map((c) => ({
      name: c.name,
      shipments: c.shipments,
      kyc: c.kyc,
      spend: invoices
        .filter((i) => i.customer === c.name)
        .reduce((n, i) => n + invoiceTotal(i), 0),
    })),
  },
  {
    id: "routes",
    label: "Routes",
    description: "Revenue earned on each route.",
    chartLabel: "Revenue",
    money: true,
    chart: byRoute.map((r) => ({ name: r.route, value: r.revenue })),
    columns: [
      { key: "route", label: "Route" },
      { key: "shipments", label: "Shipments" },
      { key: "revenue", label: "Revenue", money: true },
    ],
    rows: byRoute,
  },
  {
    id: "revenue",
    label: "Revenue",
    description: "Monthly income against expenses.",
    chartLabel: "Income",
    money: true,
    chart: monthlyFinance.map((m) => ({ name: m.month, value: m.income })),
    columns: [
      { key: "month", label: "Month" },
      { key: "income", label: "Income", money: true },
      { key: "expenses", label: "Expenses", money: true },
      { key: "profit", label: "Profit", money: true },
    ],
    rows: monthlyFinance.map((m) => ({ ...m, profit: m.income - m.expenses })),
  },
  {
    id: "agents",
    label: "Agents",
    description: "Shipments handled and commission per agent.",
    chartLabel: "Shipments",
    chart: agentsSeed.map((a) => ({
      name: a.name.split(" ")[0],
      value: a.shipmentsHandled,
    })),
    columns: [
      { key: "name", label: "Agent" },
      { key: "type", label: "Type" },
      { key: "shipments", label: "Shipments" },
      { key: "earned", label: "Commission earned", money: true },
    ],
    rows: agentsSeed.map((a) => ({
      name: a.name,
      type: a.type,
      shipments: a.shipmentsHandled,
      earned: a.earned,
    })),
  },
];

export const pricingSeed = [
  { route: "UK → Nigeria", air: 9500, sea: 2800, pickup: 6000 },
  { route: "USA → Nigeria", air: 11000, sea: 3200, pickup: 8000 },
  { route: "China → Nigeria", air: 8200, sea: 2400, pickup: 5000 },
];

export const complianceSeed: {
  id: string;
  name: string;
  status: "Verified" | "Pending" | "Rejected";
  file?: string;
}[] = [
  {
    id: "cac",
    name: "CAC registration certificate",
    status: "Verified",
    file: "cac-certificate.pdf",
  },
  {
    id: "tin",
    name: "Tax identification number",
    status: "Verified",
    file: "tin.pdf",
  },
  {
    id: "licence",
    name: "Freight forwarding licence",
    status: "Pending",
    file: "licence.pdf",
  },
  { id: "address", name: "Proof of business address", status: "Rejected" },
];
