export const compact = (n: number) =>
  "₦" +
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

export const months = [
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
];
const rev = [38, 41, 44, 43, 49, 53, 58, 61, 66, 72, 78, 84];
const comp = [14, 16, 19, 21, 24, 27, 30, 33, 37, 40, 44, 47];
const uk = [310, 330, 350, 340, 380, 400, 430, 450, 470, 510, 540, 575];
const us = [240, 255, 270, 262, 290, 310, 330, 345, 360, 390, 410, 440];
const cn = [420, 450, 480, 470, 520, 560, 610, 640, 690, 740, 790, 850];
export const platformSeries = months.map((m, i) => ({
  month: m,
  revenue: rev[i] * 1e6,
  companies: comp[i],
  uk: uk[i],
  usa: us[i],
  china: cn[i],
}));

export const kpis: {
  label: string;
  value: string;
  delta: number;
  spark: number[];
  lowerIsBetter?: boolean;
}[] = [
  { label: "Cargo companies", value: "47", delta: 9.3, spark: comp },
  {
    label: "Active subscriptions",
    value: "39",
    delta: 7.1,
    spark: [24, 26, 28, 29, 31, 32, 34, 35, 36, 37, 38, 39],
  },
  {
    label: "Expired subscriptions",
    value: "5",
    delta: 25,
    spark: [2, 2, 3, 2, 3, 3, 4, 3, 4, 4, 4, 5],
    lowerIsBetter: true,
  },
  {
    label: "Total customers",
    value: "18,420",
    delta: 12.4,
    spark: [9, 10, 11, 12, 12.5, 13.4, 14.2, 15, 15.9, 16.8, 17.6, 18.4],
  },
  {
    label: "Total shipments",
    value: "41,806",
    delta: 10.8,
    spark: [21, 23, 25, 26, 28, 30, 32, 34, 36, 38, 40, 41.8],
  },
  { label: "Total revenue", value: "₦684.2M", delta: 7.7, spark: rev },
  {
    label: "MRR",
    value: "₦3.9M",
    delta: 6.2,
    spark: [2.4, 2.5, 2.7, 2.8, 3, 3.1, 3.3, 3.4, 3.5, 3.7, 3.8, 3.9],
  },
  {
    label: "Open tickets",
    value: "23",
    delta: -14.8,
    spark: [31, 29, 33, 30, 28, 30, 27, 29, 26, 25, 27, 23],
    lowerIsBetter: true,
  },
];

export const countries = [
  { country: "China", companies: 41, shipments: 850 },
  { country: "United Kingdom", companies: 38, shipments: 575 },
  { country: "United States", companies: 31, shipments: 440 },
  { country: "Nigeria (destination)", companies: 47, shipments: 1865 },
];

export type Plan = "Trial" | "Basic" | "Standard" | "Premium" | "Enterprise";
export const plans: {
  name: Plan;
  price: number;
  staff: string;
  shipments: string;
  features: string;
}[] = [
  {
    name: "Trial",
    price: 0,
    staff: "3 staff",
    shipments: "50 shipments / mo",
    features: "14 days, one route",
  },
  {
    name: "Basic",
    price: 25000,
    staff: "5 staff",
    shipments: "500 shipments / mo",
    features: "All routes, email alerts",
  },
  {
    name: "Standard",
    price: 60000,
    staff: "15 staff",
    shipments: "2,000 shipments / mo",
    features: "SMS alerts, agents module",
  },
  {
    name: "Premium",
    price: 120000,
    staff: "40 staff",
    shipments: "10,000 shipments / mo",
    features: "WhatsApp alerts, reports",
  },
  {
    name: "Enterprise",
    price: 300000,
    staff: "Unlimited",
    shipments: "Unlimited",
    features: "Priority support, custom domain",
  },
];

export type CompanyStatus = "Active" | "Pending" | "Suspended" | "Expired";
export const companiesSeed: {
  id: string;
  name: string;
  owner: string;
  email: string;
  plan: Plan;
  status: CompanyStatus;
  customers: number;
  shipments: number;
  revenue: number;
  joined: string;
  renews: string;
  health: number;
}[] = [
  {
    id: "CMP-001",
    name: "Swiftline Cargo",
    owner: "Ade Bello",
    email: "ade@swiftline.ng",
    plan: "Premium",
    status: "Active",
    customers: 1240,
    shipments: 4820,
    revenue: 84200000,
    joined: "2026-01-14",
    renews: "2026-12-12",
    health: 92,
  },
  {
    id: "CMP-002",
    name: "Naija Express",
    owner: "Chinedu Obi",
    email: "chinedu@naijaexpress.com",
    plan: "Enterprise",
    status: "Active",
    customers: 3180,
    shipments: 11940,
    revenue: 212600000,
    joined: "2025-12-03",
    renews: "2026-12-03",
    health: 97,
  },
  {
    id: "CMP-003",
    name: "Skyway Logistics",
    owner: "Funmi Adeoye",
    email: "funmi@skyway.ng",
    plan: "Standard",
    status: "Active",
    customers: 860,
    shipments: 3110,
    revenue: 51400000,
    joined: "2026-02-20",
    renews: "2026-12-20",
    health: 81,
  },
  {
    id: "CMP-004",
    name: "Bluewave Freight",
    owner: "Tosin Alabi",
    email: "tosin@bluewave.ng",
    plan: "Basic",
    status: "Active",
    customers: 312,
    shipments: 940,
    revenue: 12800000,
    joined: "2026-04-11",
    renews: "2026-12-11",
    health: 66,
  },
  {
    id: "CMP-005",
    name: "Lagos Air Bridge",
    owner: "Kemi Ojo",
    email: "kemi@airbridge.ng",
    plan: "Trial",
    status: "Active",
    customers: 41,
    shipments: 63,
    revenue: 880000,
    joined: "2026-11-08",
    renews: "2026-11-22",
    health: 58,
  },
  {
    id: "CMP-006",
    name: "Kano Cargo Link",
    owner: "Musa Danjuma",
    email: "musa@kanolink.ng",
    plan: "Standard",
    status: "Expired",
    customers: 540,
    shipments: 1760,
    revenue: 24300000,
    joined: "2026-03-02",
    renews: "2026-10-30",
    health: 34,
  },
  {
    id: "CMP-007",
    name: "Eko Consolidators",
    owner: "Bayo Smart",
    email: "bayo@ekoconsol.ng",
    plan: "Premium",
    status: "Suspended",
    customers: 722,
    shipments: 2480,
    revenue: 38100000,
    joined: "2026-02-02",
    renews: "2026-12-02",
    health: 41,
  },
  {
    id: "CMP-008",
    name: "Orbit Movers",
    owner: "Ifeanyi Eze",
    email: "ife@orbitmovers.ng",
    plan: "Trial",
    status: "Pending",
    customers: 0,
    shipments: 0,
    revenue: 0,
    joined: "2026-11-19",
    renews: "—",
    health: 0,
  },
  {
    id: "CMP-009",
    name: "GreenLine Shipping",
    owner: "Halima Sani",
    email: "halima@greenline.ng",
    plan: "Basic",
    status: "Pending",
    customers: 0,
    shipments: 0,
    revenue: 0,
    joined: "2026-11-20",
    renews: "—",
    health: 0,
  },
];

export const companyPayments = [
  {
    id: "PAY-9021",
    date: "2026-11-12",
    plan: "Premium",
    amount: 120000,
    status: "Paid",
  },
  {
    id: "PAY-8804",
    date: "2026-10-12",
    plan: "Premium",
    amount: 120000,
    status: "Paid",
  },
  {
    id: "PAY-8590",
    date: "2026-09-12",
    plan: "Premium",
    amount: 120000,
    status: "Paid",
  },
];
export const companyActivity = [
  { text: "Created 38 shipments", time: "Today" },
  { text: "Added staff member Bisi Ajayi", time: "2 days ago" },
  { text: "Updated pricing for China → Nigeria", time: "4 days ago" },
  { text: "Upgraded plan from Standard to Premium", time: "Last month" },
];

export type SubStatus = "Active" | "Trial" | "Expired" | "Cancelled";
export const subscriptionsSeed: {
  id: string;
  company: string;
  plan: Plan;
  status: SubStatus;
  renews: string;
}[] = [
  {
    id: "SUB-201",
    company: "Naija Express",
    plan: "Enterprise",
    status: "Active",
    renews: "2026-12-03",
  },
  {
    id: "SUB-200",
    company: "Swiftline Cargo",
    plan: "Premium",
    status: "Active",
    renews: "2026-12-12",
  },
  {
    id: "SUB-198",
    company: "Skyway Logistics",
    plan: "Standard",
    status: "Active",
    renews: "2026-12-20",
  },
  {
    id: "SUB-195",
    company: "Bluewave Freight",
    plan: "Basic",
    status: "Active",
    renews: "2026-12-11",
  },
  {
    id: "SUB-194",
    company: "Lagos Air Bridge",
    plan: "Trial",
    status: "Trial",
    renews: "2026-11-22",
  },
  {
    id: "SUB-190",
    company: "Kano Cargo Link",
    plan: "Standard",
    status: "Expired",
    renews: "2026-10-30",
  },
  {
    id: "SUB-187",
    company: "Eko Consolidators",
    plan: "Premium",
    status: "Cancelled",
    renews: "2026-12-02",
  },
];

export const routesSeed: {
  id: string;
  name: string;
  origin: string;
  shipments: number;
  revenue: number;
  transitDays: number;
  companies: number;
  enabled: boolean;
}[] = [
  {
    id: "RT-UK",
    name: "UK → Nigeria",
    origin: "United Kingdom",
    shipments: 575,
    revenue: 241000000,
    transitDays: 6,
    companies: 38,
    enabled: true,
  },
  {
    id: "RT-US",
    name: "USA → Nigeria",
    origin: "United States",
    shipments: 440,
    revenue: 198000000,
    transitDays: 8,
    companies: 31,
    enabled: true,
  },
  {
    id: "RT-CN",
    name: "China → Nigeria",
    origin: "China",
    shipments: 850,
    revenue: 245200000,
    transitDays: 14,
    companies: 41,
    enabled: true,
  },
];

export const pricingCategories = [
  {
    key: "air",
    label: "Air freight",
    unit: "₦ per kg",
    note: "Charged on chargeable weight for air cargo.",
  },
  {
    key: "sea",
    label: "Sea freight",
    unit: "₦ per kg",
    note: "Charged on chargeable weight for sea cargo.",
  },
  {
    key: "customs",
    label: "Customs charges",
    unit: "% of freight",
    note: "Added on top of freight for clearance.",
  },
  {
    key: "insurance",
    label: "Insurance fees",
    unit: "% of freight",
    note: "Optional cover added to each shipment.",
  },
  {
    key: "pickup",
    label: "Pickup charges",
    unit: "₦ per pickup",
    note: "Flat fee for collecting from a customer.",
  },
] as const;
export type PricingKey = (typeof pricingCategories)[number]["key"];
export const pricingSeedAdmin: Record<PricingKey, Record<string, number>> = {
  air: {
    "UK → Nigeria": 9500,
    "USA → Nigeria": 11000,
    "China → Nigeria": 8200,
  },
  sea: { "UK → Nigeria": 2800, "USA → Nigeria": 3200, "China → Nigeria": 2400 },
  customs: { "UK → Nigeria": 12, "USA → Nigeria": 12, "China → Nigeria": 15 },
  insurance: { "UK → Nigeria": 2, "USA → Nigeria": 2, "China → Nigeria": 2.5 },
  pickup: {
    "UK → Nigeria": 6000,
    "USA → Nigeria": 8000,
    "China → Nigeria": 5000,
  },
};
