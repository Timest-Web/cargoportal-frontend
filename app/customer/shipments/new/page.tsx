/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, ChevronRight } from "lucide-react"

import PageHeader from "@/components/shared/page-header"
import Stepper from "@/components/shared/stepper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import RouteSelectStep from "@/components/shipments/route-select-step"
import InvoiceUploadStep from "@/components/shipments/invoice-upload-step"
import ShippingEstimateStep from "@/components/shipments/shipping-estimate-step"
import ConfirmStep from "@/components/shipments/confirm-step"
import { ShipmentFormInput, shipmentSchema, type ShipmentFormValues } from "@/lib/validations/shipment"
import PackageDetailsStep from "@/components/shipments/package-details-step"
import ShipmentSuccess from "@/components/shipments/shipment-success"

const STEPS = [
  { label: "Route", fields: ["route"] as const },
  { label: "Package", fields: ["description", "weight", "length", "width", "height", "category", "value"] as const },
  { label: "Invoice", fields: [] as const },
  { label: "Estimate", fields: [] as const },
  { label: "Confirm", fields: [] as const },
]

export default function CreateShipmentPage() {
  const [step, setStep] = useState(0)
  const [reference, setReference] = useState<string | null>(null)

const form = useForm<ShipmentFormInput, unknown, ShipmentFormValues>({
  resolver: zodResolver(shipmentSchema),
  mode: "onChange",
})
  const isLastStep = step === STEPS.length - 1

  async function goNext() {
    const fields = STEPS[step].fields
    const valid = fields.length === 0 ? true : await form.trigger(fields as any)
    if (!valid) return

    if (isLastStep) {
      // TODO: replace with the real create-shipment mutation
      const ref = `ATC-${Math.floor(100000 + Math.random() * 900000)}`
      setReference(ref)
      return
    }

    setStep((s) => s + 1)
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1))
  }

  if (reference) return <ShipmentSuccess reference={reference} />

  return (
    <div className="space-y-6">
      <PageHeader title="Create Shipment" description="Set up a new shipment in a few quick steps" />

      <Stepper steps={STEPS.map((s) => ({ label: s.label }))} currentStep={step} />

      <FormProvider {...form}>
        <Card className="rounded-2xl">
          <CardContent className="space-y-6 pt-6">
            {step === 0 && <RouteSelectStep />}
            {step === 1 && <PackageDetailsStep />}
            {step === 2 && <InvoiceUploadStep />}
            {step === 3 && <ShippingEstimateStep />}
            {step === 4 && <ConfirmStep onEditStep={setStep} />}

            <div className="flex items-center justify-between border-t pt-6">
              <Button type="button" variant="ghost" onClick={goBack} disabled={step === 0} className="rounded-xl">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              <Button type="button" onClick={goNext} className="rounded-xl">
                {isLastStep ? "Confirm Shipment" : "Continue"}
                {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </FormProvider>
    </div>
  )
}