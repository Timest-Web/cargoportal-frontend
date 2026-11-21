import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const good = "bg-primary/10 text-primary";
const warn = "bg-warning/15 text-warning-foreground";
const bad = "bg-destructive/10 text-destructive";
const info = "bg-info/10 text-info";
const quiet = "bg-muted text-muted-foreground";

const map: Record<string, string> = {
  Active: good, Enabled: good, Resolved: good, Connected: good, Paid: good, Low: quiet,
  Pending: warn, Trial: info, "In progress": info, Medium: info, High: warn, Open: warn,
  Suspended: bad, Expired: bad, Cancelled: quiet, Disabled: quiet, Urgent: bad, Failed: bad,
};

export function AdminStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="secondary" className={cn("border-0 font-medium", map[status] ?? "")}>
      {status}
    </Badge>
  );
}