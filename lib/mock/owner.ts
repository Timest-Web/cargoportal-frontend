export const shipmentLifecycle = [
  "Shipment Created",
  "Package Received",
  "Warehouse Check-In",
  "Processing",
  "Consolidated",
  "Assigned Flight/Container",
  "Departed Origin",
  "In Transit",
  "Arrived Nigeria",
  "Customs Clearance",
  "Cleared",
  "Out For Delivery",
  "Delivered",
] as const;

export type ShipmentStatus = (typeof shipmentLifecycle)[number];
export type Route = "UK → Nigeria" | "USA → Nigeria" | "China → Nigeria";

export const routes: Route[] = [
  "UK → Nigeria",
  "USA → Nigeria",
  "China → Nigeria",
];

export const shipments: {
  id: string;
  customer: string;
  route: Route;
  type: "Air Cargo" | "Sea Cargo";
  weightKg: number;
  status: ShipmentStatus;
  amount: number;
  date: string;
}[] = [
  {
    id: "SHP-10241",
    customer: "Adaeze Okafor",
    route: "UK → Nigeria",
    type: "Air Cargo",
    weightKg: 14.5,
    status: "In Transit",
    amount: 182000,
    date: "2026-11-08",
  },
  {
    id: "SHP-10240",
    customer: "Tunde Bakare",
    route: "USA → Nigeria",
    type: "Sea Cargo",
    weightKg: 120,
    status: "Processing",
    amount: 410000,
    date: "2026-11-07",
  },
  {
    id: "SHP-10238",
    customer: "Chiamaka Eze",
    route: "China → Nigeria",
    type: "Sea Cargo",
    weightKg: 340,
    status: "Customs Clearance",
    amount: 920000,
    date: "2026-11-05",
  },
  {
    id: "SHP-10235",
    customer: "Ibrahim Musa",
    route: "UK → Nigeria",
    type: "Air Cargo",
    weightKg: 6.2,
    status: "Delivered",
    amount: 74500,
    date: "2026-11-02",
  },
  {
    id: "SHP-10231",
    customer: "Folake Adeyemi",
    route: "USA → Nigeria",
    type: "Air Cargo",
    weightKg: 22,
    status: "Out For Delivery",
    amount: 265000,
    date: "2026-11-01",
  },
  {
    id: "SHP-10228",
    customer: "Emeka Nwosu",
    route: "China → Nigeria",
    type: "Air Cargo",
    weightKg: 48,
    status: "Package Received",
    amount: 336000,
    date: "2026-10-30",
  },
];

export const customers: {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  kyc: "Verified" | "Pending" | "Rejected";
  shipments: number;
  status: "Active" | "Suspended";
}[] = [
  {
    id: "CUS-0412",
    name: "Adaeze Okafor",
    email: "adaeze@mail.com",
    phone: "+234 803 111 2233",
    city: "Lagos",
    kyc: "Verified",
    shipments: 18,
    status: "Active",
  },
  {
    id: "CUS-0411",
    name: "Tunde Bakare",
    email: "tunde@mail.com",
    phone: "+234 806 444 5566",
    city: "Ibadan",
    kyc: "Pending",
    shipments: 4,
    status: "Active",
  },
  {
    id: "CUS-0409",
    name: "Chiamaka Eze",
    email: "chi@mail.com",
    phone: "+234 810 777 8899",
    city: "Abuja",
    kyc: "Verified",
    shipments: 31,
    status: "Active",
  },
  {
    id: "CUS-0405",
    name: "Ibrahim Musa",
    email: "ibrahim@mail.com",
    phone: "+234 802 222 3344",
    city: "Kano",
    kyc: "Rejected",
    shipments: 1,
    status: "Suspended",
  },
];

export const revenueByDay = [
  { day: "Mon", revenue: 420000 },
  { day: "Tue", revenue: 610000 },
  { day: "Wed", revenue: 380000 },
  { day: "Thu", revenue: 790000 },
  { day: "Fri", revenue: 920000 },
  { day: "Sat", revenue: 540000 },
  { day: "Sun", revenue: 260000 },
];

export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

export const routeBreakdown = [
  { route: "UK → Nigeria", shipments: 128, revenue: 14200000 },
  { route: "USA → Nigeria", shipments: 96, revenue: 11800000 },
  { route: "China → Nigeria", shipments: 154, revenue: 19600000 },
];

export const pipeline = [
  { stage: "At origin warehouse", count: 41 },
  { stage: "In transit", count: 63 },
  { stage: "Customs clearance", count: 19 },
  { stage: "Out for delivery", count: 12 },
];

export const needsAttention = [
  { label: "Pickup requests to approve", count: 7, href: "/owner/pickups" },
  {
    label: "Customers awaiting KYC review",
    count: 5,
    href: "/owner/customers",
  },
  { label: "Unpaid invoices past due", count: 11, href: "/owner/invoices" },
  { label: "Shipments held at customs", count: 3, href: "/owner/shipments" },
];

export const activity = [
  { text: "SHP-10241 departed London Heathrow", time: "12 min ago" },
  { text: "Chiamaka Eze paid invoice INV-2207", time: "40 min ago" },
  { text: "Warehouse officer checked in 9 packages (USA)", time: "1 hr ago" },
  { text: "SHP-10231 assigned to rider Segun A.", time: "2 hrs ago" },
  { text: "New customer Tunde Bakare submitted KYC", time: "3 hrs ago" },
];
