"use client"

import { useState, useEffect } from "react"
import { useChat } from "ai/react"
import { X, MessageSquare, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export function AIChat() {
  const [open, setOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Close chat with escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed z-50 rounded-full p-3 shadow-lg transition-all duration-300",
          isMobile ? "bottom-4 right-4" : "bottom-6 right-6",
          open ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90",
        )}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>

      {/* Chat interface */}
      <Card
        className={cn(
          "fixed z-40 flex flex-col transition-all duration-300 shadow-lg border border-border",
          isMobile ? "bottom-20 right-4 left-4 max-h-[80vh]" : "bottom-24 right-6 w-[400px] max-h-[600px]",
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <CardHeader className="p-4 border-b bg-card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-6">
              <p>How can I help you today?</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col max-w-[80%] rounded-lg p-3",
                  message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {message.content}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 min-h-10 max-h-40"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as any)
                }
              }}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
              <Send size={18} />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}

