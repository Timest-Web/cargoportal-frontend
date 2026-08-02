"use client"

import { useState } from "react"

import PageHeader from "@/components/shared/page-header"
import FilterTabs from "@/components/shared/filter-tabs"
import AddressSlot from "@/components/profile/address-slot"
import NotificationPreferences from "@/components/profile/notification-preferences"
import type { PersonalInfoValues, AddressValues } from "@/lib/validations/profile"
import PersonalInfoForm from "@/components/profile/personal-info-form"
import KycSlot from "@/components/profile/kyc-slot"

const sections = [
  { label: "Personal Info", value: "personal" },
  { label: "Addresses", value: "addresses" },
  { label: "KYC", value: "kyc" },
  { label: "Notifications", value: "notifications" },
]

const ADDRESS_TYPES = ["Home", "Office", "Pickup"] as const
const KYC_TYPES = ["Passport", "National ID", "Driver License"] as const

export default function ProfilePage() {
  const [section, setSection] = useState("personal")

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoValues>({
    fullName: "John Doe",
    phone: "+234 801 234 5678",
    email: "customer@email.com",
  })

  const [addresses, setAddresses] = useState<Record<(typeof ADDRESS_TYPES)[number], AddressValues | null>>({
    Home: { line1: "12 Admiralty Way, Lekki Phase 1", city: "Lagos", state: "Lagos" },
    Office: null,
    Pickup: null,
  })

  const [kycFiles, setKycFiles] = useState<Record<(typeof KYC_TYPES)[number], File | null>>({
    Passport: null,
    "National ID": null,
    "Driver License": null,
  })

  const kycStatus: Record<(typeof KYC_TYPES)[number], "Not Submitted" | "Pending Review" | "Verified" | "Rejected"> = {
    Passport: "Not Submitted",
    "National ID": "Pending Review",
    "Driver License": "Not Submitted",
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Profile & KYC" description="Manage your personal information, addresses, and verification" />

      <FilterTabs options={sections} value={section} onChange={setSection} />

      {section === "personal" && <PersonalInfoForm defaultValues={personalInfo} onSave={setPersonalInfo} />}

      {section === "addresses" && (
        <div className="space-y-4">
          {ADDRESS_TYPES.map((type) => (
            <AddressSlot
              key={type}
              label={type}
              address={addresses[type]}
              onSave={(values) => setAddresses((prev) => ({ ...prev, [type]: values }))}
            />
          ))}
        </div>
      )}

      {section === "kyc" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {KYC_TYPES.map((type) => (
            <KycSlot
              key={type}
              label={type}
              status={kycStatus[type]}
              file={kycFiles[type]}
              onChange={(file) => setKycFiles((prev) => ({ ...prev, [type]: file }))}
            />
          ))}
        </div>
      )}

      {section === "notifications" && <NotificationPreferences />}
    </div>
  )
}