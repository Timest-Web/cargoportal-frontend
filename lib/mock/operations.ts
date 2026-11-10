import { shipmentLifecycle, type ShipmentStatus } from "./owner";

export type Country = "United Kingdom" | "United States" | "China" | "Nigeria";

export const warehouses: {
  id: string;
  name: string;
  country: Country;
  address: string;
  region: string;
  city?: string;
  postal?: string;
  lga?: string;
  packages: number;
  capacity: number;
  manager: string;
}[] = [
  {
    id: "WH-UK-01",
    name: "London Hub",
    country: "United Kingdom",
    address: "Unit 4, Heathrow Cargo Park",
    region: "Greater London",
    city: "London",
    postal: "TW6 2QA",
    packages: 312,
    capacity: 72,
    manager: "Daniel Cole",
  },
  {
    id: "WH-US-01",
    name: "Houston Depot",
    country: "United States",
    address: "1200 Gulf Fwy",
    region: "Texas",
    postal: "77017",
    packages: 205,
    capacity: 58,
    manager: "Maria Lopez",
  },
  {
    id: "WH-CN-01",
    name: "Guangzhou Hub",
    country: "China",
    address: "88 Baiyun Avenue",
    region: "Guangdong",
    postal: "510000",
    packages: 487,
    capacity: 84,
    manager: "Li Wei",
  },
  {
    id: "WH-NG-01",
    name: "Lagos Terminal",
    country: "Nigeria",
    address: "Km 12, Airport Road",
    region: "Lagos",
    lga: "Ikeja",
    packages: 143,
    capacity: 46,
    manager: "Ngozi Obi",
  },
];

export const warehousePackages = [
  {
    tracking: "PKG-88213",
    customer: "Adaeze Okafor",
    shelf: "A-12",
    weightKg: 6.4,
    status: "Shelved",
  },
  {
    tracking: "PKG-88214",
    customer: "Tunde Bakare",
    shelf: "—",
    weightKg: 21,
    status: "Received",
  },
  {
    tracking: "PKG-88219",
    customer: "Chiamaka Eze",
    shelf: "B-03",
    weightKg: 14.8,
    status: "Checked in",
  },
  {
    tracking: "PKG-88222",
    customer: "Folake Adeyemi",
    shelf: "B-07",
    weightKg: 3.1,
    status: "Consolidated",
  },
  {
    tracking: "PKG-88230",
    customer: "Emeka Nwosu",
    shelf: "C-01",
    weightKg: 48,
    status: "Shelved",
  },
];

export const warehouseLoads = [
  {
    id: "FLT-BA083",
    kind: "Flight",
    route: "UK → Nigeria",
    packages: 64,
    status: "Loading",
  },
  {
    id: "CNT-MSKU449",
    kind: "Container",
    route: "China → Nigeria",
    packages: 212,
    status: "Sealed",
  },
  {
    id: "FLT-UA0125",
    kind: "Flight",
    route: "USA → Nigeria",
    packages: 38,
    status: "Open",
  },
];

export type PickupStatus = "Requested" | "Approved" | "Scheduled" | "Completed";
export const pickupsSeed: {
  id: string;
  customer: string;
  address: string;
  route: string;
  preferred: string;
  status: PickupStatus;
  driver?: string;
  scheduledFor?: string;
}[] = [
  {
    id: "PU-3301",
    customer: "Adaeze Okafor",
    address: "14 Allen Ave, Ikeja, Lagos",
    route: "UK → Nigeria",
    preferred: "2026-11-12",
    status: "Requested",
  },
  {
    id: "PU-3300",
    customer: "Tunde Bakare",
    address: "7 Ring Rd, Ibadan",
    route: "USA → Nigeria",
    preferred: "2026-11-12",
    status: "Approved",
  },
  {
    id: "PU-3297",
    customer: "Chiamaka Eze",
    address: "22 Wuse II, Abuja",
    route: "China → Nigeria",
    preferred: "2026-11-11",
    status: "Scheduled",
    driver: "Segun Adebayo",
    scheduledFor: "2026-11-11T10:00",
  },
  {
    id: "PU-3290",
    customer: "Folake Adeyemi",
    address: "3 Admiralty Way, Lekki",
    route: "USA → Nigeria",
    preferred: "2026-11-08",
    status: "Completed",
    driver: "Kunle Ojo",
    scheduledFor: "2026-11-08T14:00",
  },
];

export const drivers = [
  "Segun Adebayo",
  "Kunle Ojo",
  "Amina Yusuf",
  "Chidi Okoro",
];

export type DeliveryStatus =
  | "Unassigned"
  | "Assigned"
  | "Out for delivery"
  | "Delivered";
export const deliveriesSeed: {
  id: string;
  shipmentId: string;
  customer: string;
  address: string;
  lga: string;
  rider?: string;
  status: DeliveryStatus;
  signedBy?: string;
}[] = [
  {
    id: "DL-701",
    shipmentId: "SHP-10231",
    customer: "Folake Adeyemi",
    address: "3 Admiralty Way, Lekki",
    lga: "Eti-Osa",
    rider: "Segun Adebayo",
    status: "Out for delivery",
  },
  {
    id: "DL-702",
    shipmentId: "SHP-10226",
    customer: "Bola Ige",
    address: "9 Opebi Rd, Ikeja",
    lga: "Ikeja",
    rider: "Segun Adebayo",
    status: "Assigned",
  },
  {
    id: "DL-703",
    shipmentId: "SHP-10224",
    customer: "Ngozi Umeh",
    address: "41 Herbert Macaulay Way, Yaba",
    lga: "Lagos Mainland",
    status: "Unassigned",
  },
  {
    id: "DL-704",
    shipmentId: "SHP-10235",
    customer: "Ibrahim Musa",
    address: "5 Zoo Rd, Kano",
    lga: "Nassarawa",
    rider: "Amina Yusuf",
    status: "Delivered",
    signedBy: "Ibrahim Musa",
  },
  {
    id: "DL-705",
    shipmentId: "SHP-10222",
    customer: "Kemi Alabi",
    address: "18 Awolowo Rd, Ikoyi",
    lga: "Eti-Osa",
    rider: "Segun Adebayo",
    status: "Assigned",
  },
];

export function buildTimeline(status: ShipmentStatus, isoDate: string) {
  const current = shipmentLifecycle.indexOf(status);
  const start = new Date(isoDate + "T09:00:00Z");
  return shipmentLifecycle.map((label, i) => {
    const d = new Date(start);
    d.setUTCDate(d.getUTCDate() + i);
    return {
      label,
      state: i < current ? "done" : i === current ? "current" : "upcoming",
      date:
        i <= current
          ? d.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              timeZone: "UTC",
            })
          : "",
    } as const;
  });
}
