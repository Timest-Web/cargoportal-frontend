type Tone = "info" | "warning" | "success" | "danger" | "accent" | "muted";

const STATUS_TONE: Record<string, Tone> = {
  Processing: "warning",
  "In Transit": "info",
  "In Warehouse": "accent",
  Delivered: "success",
  "Pending Payment": "danger",
  Pending: "warning",
  Approved: "info",
  "Assigned Driver": "accent",
  Completed: "success",
  Rejected: "danger",
  Failed: "danger",
  Paid: "success",
  Unpaid: "warning",
  Overdue: "danger",
  Open: "danger",
  Resolved: "success",
  "Not Submitted": "muted",
  "Pending Review": "warning",
  Verified: "success",
};

const TONE_CLASSES: Record<Tone, string> = {
  info: "bg-blue-500/10 text-blue-600",
  warning: "bg-amber-500/10 text-amber-600",
  success: "bg-emerald-500/10 text-emerald-600",
  danger: "bg-red-500/10 text-red-600",
  accent: "bg-primary/10 text-primary",
  muted: "bg-muted text-muted-foreground",
};

type StatusBadgeProps = {
  status: string;
  className?: string;
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const tone = STATUS_TONE[status] ?? "muted";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${TONE_CLASSES[tone]} ${className ?? ""}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
