import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AIChat } from "./ai-agent/ai-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Elimentary",
  description: "AI-powered risk platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <AIChat />
      </body>
    </html>
  )
}



import './globals.css'