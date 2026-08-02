import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import AddressFormDialog from "@/components/profile/address-form-dialog"
import type { AddressValues } from "@/lib/validations/profile"

type AddressSlotProps = {
  label: string
  address: AddressValues | null
  onSave: (values: AddressValues) => void
}

export default function AddressSlot({ label, address, onSave }: AddressSlotProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-start justify-between gap-3 pt-6">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">
              {address ? `${address.line1}, ${address.city}, ${address.state}` : "Not added"}
            </p>
          </div>
        </div>
        <AddressFormDialog label={label} defaultValues={address} onSave={onSave} />
      </CardContent>
    </Card>
  )
}