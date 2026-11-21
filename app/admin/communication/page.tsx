import { OwnerPageHeader } from "@/components/owner/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigForm } from "@/components/admin/communication/config-form";
import { SmsCredits } from "@/components/admin/communication/sms-credits";
import { TemplateList } from "@/components/admin/communication/template-list";
import { emailTemplates, whatsappTemplates } from "@/lib/mock/admin-ops";

export default function CommunicationPage() {
  return (
    <>
      <OwnerPageHeader title="Communication center" description="Email, SMS and WhatsApp channels used for customer notifications on every workspace." />
      <Tabs defaultValue="email">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="mt-4 grid gap-4 lg:grid-cols-2">
          <TemplateList title="Email templates" items={emailTemplates} withSubject />
          <ConfigForm
            title="SMTP"
            description="The server that delivers platform emails."
            defaults={{ host: "smtp.mailprovider.com", port: "587", username: "no-reply@cargoplatform.com", password: "", from: "Cargo Platform <no-reply@cargoplatform.com>" }}
            fields={[
              { name: "host", label: "SMTP host" }, { name: "port", label: "Port", type: "number" },
              { name: "username", label: "Username" }, { name: "password", label: "Password", type: "password" },
              { name: "from", label: "From address" },
            ]}
          />
        </TabsContent>

        <TabsContent value="sms" className="mt-4 grid gap-4 lg:grid-cols-2">
          <ConfigForm
            title="SMS provider"
            description="Credentials for the gateway that sends OTPs and alerts."
            defaults={{ provider: "Termii", senderId: "CARGOHUB", apiKey: "" }}
            fields={[{ name: "provider", label: "Provider" }, { name: "senderId", label: "Sender ID" }, { name: "apiKey", label: "API key", type: "password" }]}
          />
          <SmsCredits />
        </TabsContent>

        <TabsContent value="whatsapp" className="mt-4 grid gap-4 lg:grid-cols-2">
          <ConfigForm
            title="WhatsApp API"
            description="Connect your WhatsApp Business account."
            defaults={{ phoneId: "", businessId: "", token: "", verifyToken: "" }}
            fields={[
              { name: "phoneId", label: "Phone number ID" }, { name: "businessId", label: "Business account ID" },
              { name: "token", label: "Access token", type: "password" }, { name: "verifyToken", label: "Webhook verify token", type: "password" },
            ]}
          />
          <TemplateList title="WhatsApp templates" items={whatsappTemplates} />
        </TabsContent>
      </Tabs>
    </>
  );
}