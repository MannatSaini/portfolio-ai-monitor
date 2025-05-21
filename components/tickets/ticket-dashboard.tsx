"use client"

import { useState } from "react"
import { TicketList } from "./ticket-list"
import { TicketFilters } from "./ticket-filters"
import { TicketStats } from "./ticket-stats"
import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw } from "lucide-react"
import { useCollaboration } from "@/hooks/use-collaboration"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TicketDashboard() {
  const { tickets, isLoadingTickets: isLoading, error, fetchTickets: refresh } = useCollaboration()
  const [activeTab, setActiveTab] = useState("all")

  // Ensure tickets is always an array
  const ticketsArray = Array.isArray(tickets) ? tickets : []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">Manage and track all your team's tickets in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </div>

      <TicketStats tickets={tickets} />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
            <TabsTrigger value="watching">Watching</TabsTrigger>
            <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          </TabsList>
          <TicketFilters />
        </div>

        <TabsContent value="all" className="mt-6">
          <TicketList tickets={ticketsArray} isLoading={isLoading} error={error ? new Error(error) : null} />
        </TabsContent>

        <TabsContent value="assigned" className="mt-6">
          <TicketList
            tickets={ticketsArray.filter((ticket) => ticket?.fields?.assignee?.displayName === "current-user")}
            isLoading={isLoading}
            error={error ? new Error(error) : null}
          />
        </TabsContent>

        <TabsContent value="watching" className="mt-6">
          <TicketList
            tickets={ticketsArray.filter((ticket) => ticket?.fields?.labels?.includes("watching"))}
            isLoading={isLoading}
            error={error ? new Error(error) : null}
          />
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <TicketList
            tickets={ticketsArray
              .sort((a, b) => new Date(b?.fields?.updated ?? 0).getTime() - new Date(a?.fields?.updated ?? 0).getTime())
              .slice(0, 10)}
            isLoading={isLoading}
            error={error ? new Error(error) : null}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

