import { OwnerPageHeader } from "@/components/owner/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyForm } from "@/components/owner/settings/company-form";
import { PricingForm } from "@/components/owner/settings/pricing-form";
import { PaymentForm } from "@/components/owner/settings/payment-form";
import { CompliancePanel } from "@/components/owner/settings/compliance-panel";

export default function SettingsPage() {
  return (
    <>
      <OwnerPageHeader title="Settings" description="Company profile, pricing, payment gateway and compliance documents." />
      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        <TabsContent value="company" className="mt-4"><CompanyForm /></TabsContent>
        <TabsContent value="pricing" className="mt-4"><PricingForm /></TabsContent>
        <TabsContent value="payments" className="mt-4"><PaymentForm /></TabsContent>
        <TabsContent value="compliance" className="mt-4"><CompliancePanel /></TabsContent>
      </Tabs>
    </>
  );
}