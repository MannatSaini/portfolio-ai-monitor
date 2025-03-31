"use client"

import { useState } from "react"
import { TicketList } from "./ticket-list"
import { TicketFilters } from "./ticket-filters"
import { TicketStats } from "./ticket-stats"
import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw } from "lucide-react"
import { useTickets } from "@/hooks/use-tickets"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TicketDashboard() {
  const { tickets, isLoading, error, refresh } = useTickets()
  const [activeTab, setActiveTab] = useState("all")

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
          <TicketList tickets={tickets} isLoading={isLoading} error={error} />
        </TabsContent>

        <TabsContent value="assigned" className="mt-6">
          <TicketList
            tickets={tickets?.filter((ticket) => ticket.assignee?.id === "current-user")}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>

        <TabsContent value="watching" className="mt-6">
          <TicketList
            tickets={tickets?.filter((ticket) => ticket.watchers?.includes("current-user"))}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <TicketList
            tickets={tickets
              ?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .slice(0, 10)}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

