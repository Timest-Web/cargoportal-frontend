import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import KeyValueList from "@/components/shared/key-value-list"

type PackageDetailsCardProps = {
  description: string
  weight: string
  dimensions: string
  category: string
  value: string
}

export default function PackageDetailsCard(props: PackageDetailsCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">Package details</CardTitle>
      </CardHeader>
      <CardContent>
        <KeyValueList
          rows={[
            { label: "Description", value: props.description },
            { label: "Weight", value: props.weight },
            { label: "Dimensions", value: props.dimensions },
            { label: "Category", value: props.category },
            { label: "Declared value", value: props.value },
          ]}
        />
      </CardContent>
    </Card>
  )
}