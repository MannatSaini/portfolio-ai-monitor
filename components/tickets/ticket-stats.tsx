"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Clock, FileWarning, HelpCircle } from "lucide-react"

interface JiraTicket {
  id: string;
  key: string;
  fields: {
    summary: string;
    description: string;
    status: {
      name: string;
    };
    priority: {
      name: string;
    };
    assignee: {
      displayName: string;
    };
    created: string;
    updated: string;
    labels: string[];
  };
}

interface TicketStatsProps {
  tickets: JiraTicket[];
}

export function TicketStats({ tickets }: TicketStatsProps) {
  // Ensure tickets is always an array
  const ticketsArray = Array.isArray(tickets) ? tickets : []

  const openCount = ticketsArray.filter((t) => t?.fields?.status?.name?.toLowerCase() === "open").length
  const inProgressCount = ticketsArray.filter((t) => t?.fields?.status?.name?.toLowerCase() === "in progress").length
  const resolvedCount = ticketsArray.filter((t) => t?.fields?.status?.name?.toLowerCase() === "resolved").length
  const closedCount = ticketsArray.filter((t) => t?.fields?.status?.name?.toLowerCase() === "closed").length
  const blockedCount = ticketsArray.filter((t) => t?.fields?.status?.name?.toLowerCase() === "blocked").length
  const doneCount = ticketsArray.filter((t) => t?.fields?.status?.name?.toLowerCase() === "done").length

  // Calculate tickets due soon (within 3 days)
  const now = new Date()
  const threeDaysFromNow = new Date()
  threeDaysFromNow.setDate(now.getDate() + 3)

  const dueSoonCount = ticketsArray.filter((t) => {
    if (!t?.fields?.updated) return false
    const dueDate = new Date(t.fields.updated)
    return dueDate >= now && dueDate <= threeDaysFromNow
  }).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open</CardTitle>
          <FileWarning className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{openCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Done</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{doneCount}</div>
        </CardContent>
      </Card>
    </div>
  )
}

