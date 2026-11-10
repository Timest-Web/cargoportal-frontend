import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-primary/10 text-primary",
  info: "bg-info/10 text-info",
  warning: "bg-warning/15 text-warning-foreground",
  wallet: "bg-wallet/10 text-wallet",
  destructive: "bg-destructive/10 text-destructive",
} as const;

export function OwnerStatCard({
  label, value, hint, icon: Icon, tone = "primary",
}: { label: string; value: string; hint?: string; icon: LucideIcon; tone?: keyof typeof tones }) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <span className={cn("flex size-10 items-center justify-center rounded-xl", tones[tone])}>
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  );
}