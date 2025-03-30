import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AIProvider } from "@/components/ai-agent/ai-provider"
import { AuthProvider } from "@/contexts/auth-context"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Elimentary",
  description: "AI-powered risk platform",
    generator: 'MS'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <Toaster />
        <AIProvider initialDebugMode={false}>{children}</AIProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'