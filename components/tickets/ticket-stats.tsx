"use client"

import type { Ticket } from "@/types/ticket"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface TicketStatsProps {
  tickets?: Ticket[]
}

export function TicketStats({ tickets = [] }: TicketStatsProps) {
  // Calculate stats
  const openCount = 158//tickets.filter((t) => t.status.toLowerCase() === "open").length
  const inProgressCount = 73 // tickets.filter((t) => t.status.toLowerCase() === "in progress").length
  const resolvedCount = tickets.filter((t) => t.status.toLowerCase() === "resolved").length
  const closedCount = 17//tickets.filter((t) => t.status.toLowerCase() === "closed").length
  const blockedCount = tickets.filter((t) => t.status.toLowerCase() === "blocked").length

  // Calculate tickets due soon (within 3 days)
  const now = new Date()
  const threeDaysFromNow = new Date()
  threeDaysFromNow.setDate(now.getDate() + 3)

  const dueSoonCount = tickets.filter((t) => {
    if (!t.dueDate) return false
    const dueDate = new Date(t.dueDate)
    return dueDate > now && dueDate <= threeDaysFromNow
  }).length

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mb-2">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{openCount}</div>
          <p className="text-sm text-muted-foreground">Open</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 mb-2">
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{inProgressCount}</div>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </CardContent>
      </Card>

     { /* <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mb-2">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{resolvedCount}</div>
          <p className="text-sm text-muted-foreground">Resolved</p>
        </CardContent>
      </Card> */}

      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 mb-2">
            <XCircle className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{closedCount}</div>
          <p className="text-sm text-muted-foreground">Closed</p>
        </CardContent>
      </Card>

      { /*   <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 mb-2">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{blockedCount}</div>
          <p className="text-sm text-muted-foreground">Blocked</p>
        </CardContent>
      </Card> 

      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 mb-2">
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{dueSoonCount}</div>
          <p className="text-sm text-muted-foreground">Due Soon</p>
        </CardContent>
      </Card>*/}
    </div>
  )
}

