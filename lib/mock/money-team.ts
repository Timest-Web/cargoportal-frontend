import type { Route } from "./owner";

export const incomeEntries = [
  {
    id: "INC-5521",
    category: "Shipment charges",
    ref: "SHP-10241",
    amount: 182000,
    date: "2026-11-12",
  },
  {
    id: "INC-5520",
    category: "Customs fees",
    ref: "SHP-10238",
    amount: 145000,
    date: "2026-11-12",
  },
  {
    id: "INC-5518",
    category: "Insurance",
    ref: "SHP-10235",
    amount: 18500,
    date: "2026-11-11",
  },
  {
    id: "INC-5517",
    category: "Shipment charges",
    ref: "SHP-10231",
    amount: 265000,
    date: "2026-11-11",
  },
  {
    id: "INC-5512",
    category: "Customs fees",
    ref: "SHP-10228",
    amount: 96000,
    date: "2026-11-10",
  },
];

export const expenseCategories = [
  "Staff salaries",
  "Rent",
  "Logistics",
] as const;
export type ExpenseCategory = (typeof expenseCategories)[number];
export const expensesSeed: {
  id: string;
  category: ExpenseCategory;
  note: string;
  amount: number;
  date: string;
}[] = [
  {
    id: "EXP-901",
    category: "Staff salaries",
    note: "October payroll",
    amount: 2850000,
    date: "2026-11-01",
  },
  {
    id: "EXP-902",
    category: "Rent",
    note: "Lagos terminal, November",
    amount: 1200000,
    date: "2026-11-01",
  },
  {
    id: "EXP-903",
    category: "Logistics",
    note: "Fuel and rider allowances",
    amount: 640000,
    date: "2026-11-05",
  },
  {
    id: "EXP-904",
    category: "Logistics",
    note: "Container haulage, Apapa",
    amount: 780000,
    date: "2026-11-08",
  },
];

export const monthlyFinance = [
  { month: "Jun", income: 18200000, expenses: 9100000 },
  { month: "Jul", income: 20400000, expenses: 9800000 },
  { month: "Aug", income: 19100000, expenses: 10200000 },
  { month: "Sep", income: 23600000, expenses: 10900000 },
  { month: "Oct", income: 26800000, expenses: 11400000 },
  { month: "Nov", income: 21300000, expenses: 8400000 },
];
export const dailyRevenue = [
  { day: "Mon", revenue: 420000 },
  { day: "Tue", revenue: 610000 },
  { day: "Wed", revenue: 380000 },
  { day: "Thu", revenue: 790000 },
  { day: "Fri", revenue: 920000 },
  { day: "Sat", revenue: 540000 },
  { day: "Sun", revenue: 260000 },
];

export type InvoiceStatus = "Paid" | "Unpaid" | "Overdue" | "Part paid";
export const invoices: {
  id: string;
  customer: string;
  shipmentId: string;
  issued: string;
  due: string;
  status: InvoiceStatus;
  shipping: number;
  customs: number;
  insurance: number;
  delivery: number;
  paid: number;
}[] = [
  {
    id: "INV-2207",
    customer: "Chiamaka Eze",
    shipmentId: "SHP-10238",
    issued: "2026-11-05",
    due: "2026-11-19",
    status: "Paid",
    shipping: 620000,
    customs: 240000,
    insurance: 30000,
    delivery: 30000,
    paid: 920000,
  },
  {
    id: "INV-2206",
    customer: "Adaeze Okafor",
    shipmentId: "SHP-10241",
    issued: "2026-11-08",
    due: "2026-11-22",
    status: "Unpaid",
    shipping: 150000,
    customs: 18000,
    insurance: 4000,
    delivery: 10000,
    paid: 0,
  },
  {
    id: "INV-2203",
    customer: "Tunde Bakare",
    shipmentId: "SHP-10240",
    issued: "2026-11-07",
    due: "2026-11-21",
    status: "Part paid",
    shipping: 330000,
    customs: 55000,
    insurance: 10000,
    delivery: 15000,
    paid: 200000,
  },
  {
    id: "INV-2190",
    customer: "Emeka Nwosu",
    shipmentId: "SHP-10228",
    issued: "2026-10-30",
    due: "2026-11-06",
    status: "Overdue",
    shipping: 260000,
    customs: 55000,
    insurance: 6000,
    delivery: 15000,
    paid: 0,
  },
];
export const invoiceTotal = (i: {
  shipping: number;
  customs: number;
  insurance: number;
  delivery: number;
}) => i.shipping + i.customs + i.insurance + i.delivery;

export const staffRoles = [
  "Operations Manager",
  "Warehouse Officer",
  "Customer Service",
  "Finance Officer",
  "Delivery Coordinator",
] as const;
export type StaffRole = (typeof staffRoles)[number];
export const rolePermissions: Record<StaffRole, string> = {
  "Operations Manager": "Manages shipments and logistics.",
  "Warehouse Officer": "Manages package handling.",
  "Finance Officer": "Manages payments and invoices.",
  "Customer Service": "Handles customers and support.",
  "Delivery Coordinator": "Assigns riders and confirms deliveries.",
};
export const staffSeed: {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  location: string;
  status: "Active" | "Inactive";
}[] = [
  {
    id: "STF-01",
    name: "Ngozi Obi",
    email: "ngozi@cargoportal.ng",
    role: "Operations Manager",
    location: "Lagos",
    status: "Active",
  },
  {
    id: "STF-02",
    name: "Daniel Cole",
    email: "daniel@cargoportal.ng",
    role: "Warehouse Officer",
    location: "London",
    status: "Active",
  },
  {
    id: "STF-03",
    name: "Bisi Ajayi",
    email: "bisi@cargoportal.ng",
    role: "Finance Officer",
    location: "Lagos",
    status: "Active",
  },
  {
    id: "STF-04",
    name: "Yemi Kassim",
    email: "yemi@cargoportal.ng",
    role: "Customer Service",
    location: "Lagos",
    status: "Inactive",
  },
  {
    id: "STF-05",
    name: "Obinna Eze",
    email: "obinna@cargoportal.ng",
    role: "Delivery Coordinator",
    location: "Abuja",
    status: "Active",
  },
];

export type AgentType =
  | "UK Agent"
  | "USA Agent"
  | "China Agent"
  | "Nigeria Agent";
export const agentTypes: AgentType[] = [
  "UK Agent",
  "USA Agent",
  "China Agent",
  "Nigeria Agent",
];
export const agentsSeed: {
  id: string;
  name: string;
  email: string;
  type: AgentType;
  route: Route;
  commissionRate: number;
  customerIds: string[];
  shipmentsHandled: number;
  earned: number;
  paid: number;
  status: "Active" | "Inactive";
}[] = [
  {
    id: "AGT-01",
    name: "James Whitfield",
    email: "james@partner.co.uk",
    type: "UK Agent",
    route: "UK → Nigeria",
    commissionRate: 5,
    customerIds: ["CUS-0412", "CUS-0405"],
    shipmentsHandled: 86,
    earned: 640000,
    paid: 500000,
    status: "Active",
  },
  {
    id: "AGT-02",
    name: "Priya Shah",
    email: "priya@partner.com",
    type: "USA Agent",
    route: "USA → Nigeria",
    commissionRate: 4.5,
    customerIds: ["CUS-0411"],
    shipmentsHandled: 54,
    earned: 410000,
    paid: 410000,
    status: "Active",
  },
  {
    id: "AGT-03",
    name: "Chen Hao",
    email: "chen@partner.cn",
    type: "China Agent",
    route: "China → Nigeria",
    commissionRate: 6,
    customerIds: ["CUS-0409"],
    shipmentsHandled: 132,
    earned: 1120000,
    paid: 800000,
    status: "Active",
  },
  {
    id: "AGT-04",
    name: "Femi Adewale",
    email: "femi@partner.ng",
    type: "Nigeria Agent",
    route: "UK → Nigeria",
    commissionRate: 3,
    customerIds: [],
    shipmentsHandled: 12,
    earned: 48000,
    paid: 0,
    status: "Inactive",
  },
];
