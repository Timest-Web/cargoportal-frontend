import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import KeyValueList from "@/components/shared/key-value-list"

type ShippingChargesCardProps = {
  freight: string
  customs: string
  insurance: string
  pickupFee: string
  total: string
}

export default function ShippingChargesCard(props: ShippingChargesCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">Shipping charges</CardTitle>
      </CardHeader>
      <CardContent>
        <KeyValueList
          rows={[
            { label: "Freight cost", value: props.freight },
            { label: "Customs", value: props.customs },
            { label: "Insurance", value: props.insurance },
            { label: "Pickup fee", value: props.pickupFee },
          ]}
          total={{ label: "Total", value: props.total }}
        />
      </CardContent>
    </Card>
  )
}