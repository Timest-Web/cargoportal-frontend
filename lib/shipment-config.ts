export const STAGE_IDS = [
  "created",
  "package_received",
  "warehouse_check_in",
  "processing",
  "consolidated",
  "assigned_flight_container",
  "departed_origin",
  "in_transit",
  "arrived_nigeria",
  "customs_clearance",
  "cleared",
  "out_for_delivery",
  "delivered",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

export type StageGroupId =
  | "origin"
  | "loading"
  | "transit"
  | "nigeria"
  | "delivery";

/** The five statuses a customer sees when tracking. */
export type CustomerStatus =
  | "received"
  | "processing"
  | "in_transit"
  | "arrived_nigeria"
  | "delivered";

export interface StageDef {
  id: StageId;
  label: string;
  group: StageGroupId;
  /** null = not visible to the customer yet (no package in the warehouse). */
  customerStatus: CustomerStatus | null;
  /** The shipment's journey is over at this stage. */
  terminal?: boolean;
}

/** Single source of truth for the 13-stage lifecycle, in order. */
export const SHIPMENT_STAGES: readonly StageDef[] = [
  {
    id: "created",
    label: "Shipment created",
    group: "origin",
    customerStatus: null,
  },
  {
    id: "package_received",
    label: "Package received",
    group: "origin",
    customerStatus: "received",
  },
  {
    id: "warehouse_check_in",
    label: "Warehouse check-in",
    group: "origin",
    customerStatus: "received",
  },
  {
    id: "processing",
    label: "Processing",
    group: "origin",
    customerStatus: "processing",
  },
  {
    id: "consolidated",
    label: "Consolidated",
    group: "loading",
    customerStatus: "processing",
  },
  {
    id: "assigned_flight_container",
    label: "Assigned to flight or container",
    group: "loading",
    customerStatus: "processing",
  },
  {
    id: "departed_origin",
    label: "Departed origin",
    group: "transit",
    customerStatus: "in_transit",
  },
  {
    id: "in_transit",
    label: "In transit",
    group: "transit",
    customerStatus: "in_transit",
  },
  {
    id: "arrived_nigeria",
    label: "Arrived in Nigeria",
    group: "nigeria",
    customerStatus: "arrived_nigeria",
  },
  {
    id: "customs_clearance",
    label: "Customs clearance",
    group: "nigeria",
    customerStatus: "arrived_nigeria",
  },
  {
    id: "cleared",
    label: "Cleared",
    group: "nigeria",
    customerStatus: "arrived_nigeria",
  },
  {
    id: "out_for_delivery",
    label: "Out for delivery",
    group: "delivery",
    customerStatus: "arrived_nigeria",
  },
  {
    id: "delivered",
    label: "Delivered",
    group: "delivery",
    customerStatus: "delivered",
    terminal: true,
  },
];

export const STAGE_BY_ID = Object.fromEntries(
  SHIPMENT_STAGES.map((stage, index) => [stage.id, { ...stage, index }]),
) as Record<StageId, StageDef & { index: number }>;

const GROUP_LABELS: Record<StageGroupId, string> = {
  origin: "Origin",
  loading: "Loading",
  transit: "Transit",
  nigeria: "Nigeria",
  delivery: "Delivery",
};

export const STAGE_GROUPS = (Object.keys(GROUP_LABELS) as StageGroupId[]).map(
  (id) => ({
    id,
    label: GROUP_LABELS[id],
    stages: SHIPMENT_STAGES.filter((stage) => stage.group === id),
  }),
);

export const ROUTE_IDS = ["uk_ng", "usa_ng", "china_ng"] as const;

export type RouteId = (typeof ROUTE_IDS)[number];

export const SHIPMENT_ROUTES: Record<
  RouteId,
  { label: string; originCountry: string }
> = {
  uk_ng: { label: "UK → Nigeria", originCountry: "United Kingdom" },
  usa_ng: { label: "USA → Nigeria", originCountry: "United States" },
  china_ng: { label: "China → Nigeria", originCountry: "China" },
};

export const SHIPMENT_TYPE_IDS = ["air", "sea"] as const;

export type ShipmentType = (typeof SHIPMENT_TYPE_IDS)[number];

export const SHIPMENT_TYPES: Record<ShipmentType, { label: string }> = {
  air: { label: "Air cargo" },
  sea: { label: "Sea cargo" },
};
