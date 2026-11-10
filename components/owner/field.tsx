import { Label } from "@/components/ui/label";

export function OwnerField({
  label, error, className, children,
}: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}