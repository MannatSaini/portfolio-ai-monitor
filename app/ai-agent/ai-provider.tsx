"use client"

import { type ReactNode, createContext, useContext, useState } from "react"
import { AIChat } from "./ai-chat"

type AIContextType = {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = () => setIsOpen(true)
  const closeChat = () => setIsOpen(false)
  const toggleChat = () => setIsOpen((prev) => !prev)

  return (
    <AIContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
      <AIChat />
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = useContext(AIContext)

  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider")
  }

  return context
}

