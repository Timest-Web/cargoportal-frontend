export type Template = {
  id: string;
  name: string;
  subject?: string;
  body: string;
  status?: "Approved" | "Pending";
};

export const emailTemplates: Template[] = [
  {
    id: "em-1",
    name: "Welcome email",
    subject: "Welcome to {{company_name}}",
    body: "Hi {{customer_name}}, your account is ready. You can now create shipments from your dashboard.",
  },
  {
    id: "em-2",
    name: "Shipment status update",
    subject: "Update on {{tracking_number}}",
    body: "Hi {{customer_name}}, your shipment {{tracking_number}} is now {{status}}.",
  },
  {
    id: "em-3",
    name: "Invoice issued",
    subject: "Invoice {{invoice_number}} is ready",
    body: "Hi {{customer_name}}, invoice {{invoice_number}} for {{amount}} is due on {{due_date}}.",
  },
];
export const whatsappTemplates: Template[] = [
  {
    id: "wa-1",
    name: "shipment_update",
    body: "Hello {{customer_name}}, shipment {{tracking_number}} is now {{status}}.",
    status: "Approved",
  },
  {
    id: "wa-2",
    name: "payment_reminder",
    body: "Hi {{customer_name}}, a balance of {{amount}} is due for {{tracking_number}}.",
    status: "Approved",
  },
  {
    id: "wa-3",
    name: "delivery_otp",
    body: "Your delivery code is {{otp}}. Share it only with the rider.",
    status: "Pending",
  },
];
export const smsUsage = [
  { day: "Mon", sent: 4210 },
  { day: "Tue", sent: 5120 },
  { day: "Wed", sent: 4780 },
  { day: "Thu", sent: 6030 },
  { day: "Fri", sent: 6890 },
  { day: "Sat", sent: 3120 },
  { day: "Sun", sent: 1980 },
];

export type TicketStatus = "Open" | "In progress" | "Resolved";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export const supportAgents = ["Amaka Obi", "Tolu Bright", "Yusuf Lawal"];
export const ticketsSeed: {
  id: string;
  subject: string;
  company: string;
  priority: Priority;
  status: TicketStatus;
  assignee: string;
  created: string;
}[] = [
  {
    id: "TCK-1042",
    subject: "Customers cannot pay invoices",
    company: "Naija Express",
    priority: "Urgent",
    status: "Open",
    assignee: "",
    created: "2026-11-21",
  },
  {
    id: "TCK-1041",
    subject: "WhatsApp alerts not sending",
    company: "Swiftline Cargo",
    priority: "High",
    status: "In progress",
    assignee: "Tolu Bright",
    created: "2026-11-20",
  },
  {
    id: "TCK-1039",
    subject: "Need help importing customers",
    company: "Bluewave Freight",
    priority: "Medium",
    status: "Open",
    assignee: "",
    created: "2026-11-20",
  },
  {
    id: "TCK-1036",
    subject: "How do I add a Nigeria agent?",
    company: "Lagos Air Bridge",
    priority: "Low",
    status: "In progress",
    assignee: "Amaka Obi",
    created: "2026-11-19",
  },
  {
    id: "TCK-1030",
    subject: "Plan upgrade not reflected",
    company: "Skyway Logistics",
    priority: "High",
    status: "Resolved",
    assignee: "Yusuf Lawal",
    created: "2026-11-17",
  },
];
export const chatLogs: {
  id: string;
  company: string;
  agent: string;
  when: string;
  messages: { from: "company" | "agent"; text: string }[];
}[] = [
  {
    id: "CH-310",
    company: "Swiftline Cargo",
    agent: "Tolu Bright",
    when: "Today, 10:42",
    messages: [
      {
        from: "company",
        text: "Our WhatsApp notifications stopped this morning.",
      },
      {
        from: "agent",
        text: "Thanks, checking your WhatsApp API connection now.",
      },
      {
        from: "agent",
        text: "The access token expired. Please reconnect it under Settings, then retry.",
      },
      { from: "company", text: "Reconnected. Messages are going out again." },
    ],
  },
  {
    id: "CH-309",
    company: "Bluewave Freight",
    agent: "Amaka Obi",
    when: "Yesterday, 16:05",
    messages: [
      { from: "company", text: "Can we add a second warehouse in the USA?" },
      {
        from: "agent",
        text: "Yes. Go to Warehouses, choose Add warehouse, then pick United States.",
      },
    ],
  },
  {
    id: "CH-305",
    company: "Kano Cargo Link",
    agent: "Yusuf Lawal",
    when: "Mon, 09:30",
    messages: [
      { from: "company", text: "Our subscription shows expired but we paid." },
      {
        from: "agent",
        text: "I can see the payment. I have renewed the plan for you.",
      },
    ],
  },
];
