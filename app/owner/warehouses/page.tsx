import Link from "next/link";
import { MapPin, Plus, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OwnerPageHeader } from "@/components/owner/header";
import { warehouses } from "@/lib/mock/operations";

export default function WarehousesPage() {
  return (
    <>
      <OwnerPageHeader
        title="Warehouses"
        description="Your receiving and dispatch points in the UK, USA, China and Nigeria."
        actions={<Button nativeButton={false} render={<Link href="/owner/warehouses/new" />}><Plus /> Add warehouse</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {warehouses.map((w) => (
          <Link key={w.id} href={`/owner/warehouses/${w.id}`}>
            <Card className="h-full transition-colors hover:bg-accent/40">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold">{w.name}</p>
                    <p className="text-sm text-muted-foreground">{w.country} · {w.id}</p>
                  </div>
                  <span className="text-2xl font-semibold">{w.packages}<span className="ml-1 text-sm font-normal text-muted-foreground">packages</span></span>
                </div>
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  {[w.address, w.city, w.lga, w.region, w.postal].filter(Boolean).join(", ")}
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Shelf capacity used</span><span>{w.capacity}%</span></div>
                  <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${w.capacity}%` }} /></div>
                </div>
                <p className="flex items-center gap-2 text-sm"><UserRound className="size-4 text-muted-foreground" /> {w.manager}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}