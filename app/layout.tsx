import type { Metadata } from "next"
import { Inter, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Cargo Portal",
  description: "Cargo Portal Management System",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
     <TooltipProvider>
        {children}
      </TooltipProvider>
      </body>
    </html>
  )
}