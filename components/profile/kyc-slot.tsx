import { Card, CardContent } from "@/components/ui/card"
import StatusBadge from "@/components/shared/status-badge"
import FileUploadSlot from "@/components/shared/file-upload-slot"

type KycSlotProps = {
  label: string
  status: "Not Submitted" | "Pending Review" | "Verified" | "Rejected"
  file: File | null
  onChange: (file: File | null) => void
}

export default function KycSlot({ label, status, file, onChange }: KycSlotProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{label}</p>
          <StatusBadge status={status} />
        </div>
        <FileUploadSlot file={file} onChange={onChange} />
      </CardContent>
    </Card>
  )
}