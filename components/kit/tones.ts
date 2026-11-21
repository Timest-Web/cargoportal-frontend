export type Tone =
  | "primary"
  | "info"
  | "wallet"
  | "warning"
  | "destructive"
  | "slate";

type ToneStyle = {
  solid: string;
  soft: string;
  chip: string;
  text: string;
  pill: string;
  dot: string;
  bar: string;
  borderL: string;
  cssVar: string;
  onSolid: string;
};

const warnText = "text-amber-700 dark:text-amber-300";

export const tones: Record<Tone, ToneStyle> = {
  primary: {
    solid: "bg-linear-to-br from-primary to-primary/65 text-primary-foreground",
    soft: "bg-primary/5 border-primary/20",
    chip: "bg-primary/15 text-primary",
    text: "text-primary",
    pill: "bg-primary/10 text-primary",
    dot: "bg-primary",
    bar: "bg-primary",
    borderL: "border-l-primary",
    cssVar: "var(--primary)",
    onSolid: "bg-white/20",
  },
  info: {
    solid: "bg-linear-to-br from-info to-info/65 text-white",
    soft: "bg-info/5 border-info/20",
    chip: "bg-info/15 text-info",
    text: "text-info",
    pill: "bg-info/10 text-info",
    dot: "bg-info",
    bar: "bg-info",
    borderL: "border-l-info",
    cssVar: "var(--info)",
    onSolid: "bg-white/20",
  },
  wallet: {
    solid: "bg-linear-to-br from-wallet to-wallet/65 text-white",
    soft: "bg-wallet/5 border-wallet/20",
    chip: "bg-wallet/15 text-wallet",
    text: "text-wallet",
    pill: "bg-wallet/10 text-wallet",
    dot: "bg-wallet",
    bar: "bg-wallet",
    borderL: "border-l-wallet",
    cssVar: "var(--wallet)",
    onSolid: "bg-white/20",
  },
  warning: {
    solid: "bg-linear-to-br from-warning to-warning/70 text-warning-foreground",
    soft: "bg-warning/10 border-warning/30",
    chip: `bg-warning/20 ${warnText}`,
    text: warnText,
    pill: `bg-warning/15 ${warnText}`,
    dot: "bg-warning",
    bar: "bg-warning",
    borderL: "border-l-warning",
    cssVar: "var(--warning)",
    onSolid: "bg-black/10",
  },
  destructive: {
    solid: "bg-linear-to-br from-destructive to-destructive/65 text-white",
    soft: "bg-destructive/5 border-destructive/20",
    chip: "bg-destructive/15 text-destructive",
    text: "text-destructive",
    pill: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
    bar: "bg-destructive",
    borderL: "border-l-destructive",
    cssVar: "var(--destructive)",
    onSolid: "bg-white/20",
  },
  slate: {
    solid:
      "bg-linear-to-br from-sidebar to-sidebar-accent text-sidebar-foreground",
    soft: "bg-muted/50 border-border",
    chip: "bg-muted text-foreground",
    text: "text-foreground",
    pill: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    bar: "bg-foreground/60",
    borderL: "border-l-muted-foreground/40",
    cssVar: "var(--muted-foreground)",
    onSolid: "bg-white/10",
  },
};

const map: Record<string, Tone> = {
  // green
  Delivered: "primary",
  Cleared: "primary",
  Verified: "primary",
  Active: "primary",
  Paid: "primary",
  Enabled: "primary",
  Resolved: "primary",
  Approved: "primary",
  Completed: "primary",
  Connected: "primary",
  Shelved: "primary",
  Sealed: "primary",
  // blue
  "Package Received": "info",
  "Warehouse Check-In": "info",
  "Arrived Nigeria": "info",
  Trial: "info",
  "In progress": "info",
  "Part paid": "info",
  Medium: "info",
  Scheduled: "info",
  Assigned: "info",
  Received: "info",
  "Checked in": "info",
  Loading: "info",
  // purple
  "In Transit": "wallet",
  "Out For Delivery": "wallet",
  "Out for delivery": "wallet",
  Consolidated: "wallet",
  // amber
  Processing: "warning",
  "Customs Clearance": "warning",
  Pending: "warning",
  Unpaid: "warning",
  Open: "warning",
  High: "warning",
  Requested: "warning",
  Unassigned: "warning",
  // red
  Rejected: "destructive",
  Suspended: "destructive",
  Overdue: "destructive",
  Expired: "destructive",
  Urgent: "destructive",
  Failed: "destructive",
};

export const toneFor = (status: string): Tone => map[status] ?? "slate";
