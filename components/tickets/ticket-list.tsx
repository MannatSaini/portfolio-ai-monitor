"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronDown, ChevronUp, AlertCircle, MessageSquare, Share2, Bell } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Ticket } from "@/types/ticket"
import { TicketDetails } from "./ticket-details"
import { SendReminderDialog } from "./send-reminder-dialog"
import { ShareTicketDialog } from "./share-ticket-dialog"

interface TicketListProps {
  tickets?: Ticket[]
  isLoading: boolean
  error: Error | null
}

export function TicketList({ tickets, isLoading, error }: TicketListProps) {
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null)
  const [reminderTicketId, setReminderTicketId] = useState<string | null>(null)
  const [shareTicketId, setShareTicketId] = useState<string | null>(null)

  const toggleExpand = (ticketId: string) => {
    setExpandedTicketId(expandedTicketId === ticketId ? null : ticketId)
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load tickets: {error.message}</AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No tickets found</h3>
        <p className="text-muted-foreground">There are no tickets matching your criteria.</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-500"
      case "in progress":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      case "closed":
        return "bg-gray-500"
      case "blocked":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "highest":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      case "lowest":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Key</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[120px]">Priority</TableHead>
            <TableHead className="w-[150px]">Assignee</TableHead>
            <TableHead className="w-[150px]">Created</TableHead>
            <TableHead className="w-[150px]">Due Date</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <>
              <TableRow key={ticket.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{ticket.key}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto mr-2"
                      onClick={() => toggleExpand(ticket.id)}
                    >
                      {expandedTicketId === ticket.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    {ticket.summary}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {ticket.assignee ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">
                          {ticket.assignee.name.charAt(0)}
                        </div>
                        <span>{ticket.assignee.name}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</TableCell>
                <TableCell>
                  {ticket.dueDate ? (
                    formatDistanceToNow(new Date(ticket.dueDate), { addSuffix: true })
                  ) : (
                    <span className="text-muted-foreground">No due date</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setReminderTicketId(ticket.id)}
                      title="Send reminder"
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleExpand(ticket.id)} title="View comments">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShareTicketId(ticket.id)}
                      title="Share ticket"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {expandedTicketId === ticket.id && (
                <TableRow>
                  <TableCell colSpan={8} className="p-0">
                    <TicketDetails ticket={ticket} />
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>

      {/* Reminder Dialog */}
      <SendReminderDialog
        open={!!reminderTicketId}
        onOpenChange={() => setReminderTicketId(null)}
        ticket={tickets.find((t) => t.id === reminderTicketId)}
      />

      {/* Share Dialog */}
      <ShareTicketDialog
        open={!!shareTicketId}
        onOpenChange={() => setShareTicketId(null)}
        ticket={tickets.find((t) => t.id === shareTicketId)}
      />
    </>
  )
}

