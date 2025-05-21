"use client"

import { useState, useEffect } from "react"
import { getJiraTickets } from "@/lib/jira"
import { getErrorMessage } from "@/lib/error-mapping"

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

export function useTickets() {
  const [tickets, setTickets] = useState<JiraTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTickets = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await getJiraTickets()
      if (result.success && result.data) {
        setTickets(result.data)
      } else {
        setError(new Error(getErrorMessage(result.error)))
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch tickets"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  return {
    tickets,
    isLoading,
    error,
    refresh: fetchTickets,
  }
}

// Mock data for tickets
const mockTickets: JiraTicket[] = []

