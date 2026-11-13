
import type { Metadata } from "next"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import Providers from "./providers"
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-d" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-b" });

export const metadata: Metadata = {
  title: "Cargo Portal – Cargo software for UK, USA and China to Nigeria freight",
  description: "Manage shipments, warehouses, agents, invoices and customer tracking in one portal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
       <Providers>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </Providers>
    </html>
  );
}