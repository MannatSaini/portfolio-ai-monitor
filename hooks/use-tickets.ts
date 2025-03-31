"use client"

import { useState, useEffect } from "react"
import type { Ticket } from "@/types/ticket"

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTickets = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // const response = await fetch("/api/tickets")
      // const data = await response.json()
      // setTickets(data)

      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTickets(mockTickets)
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
const mockTickets: Ticket[] = [
  {
    id: "1",
    key: "PROJ-123",
    summary: "Fix login page authentication issue",
    description: "Users are experiencing intermittent login failures when using SSO.",
    status: "In Progress",
    priority: "High",
    type: "Bug",
    assignee: {
      id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user2",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "",
    },
    createdAt: "2023-05-10T09:00:00Z",
    updatedAt: "2023-05-15T14:30:00Z",
    dueDate: "2023-05-20T00:00:00Z",
    components: ["Authentication", "Frontend"],
    labels: ["bug", "security", "urgent"],
    comments: [
      {
        id: "comment1",
        author: {
          id: "user2",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
        content: "I've identified the issue. It appears to be related to the token expiration handling.",
        createdAt: "2023-05-12T10:15:00Z",
      },
      {
        id: "comment2",
        author: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        content: "Working on a fix now. Should be ready for testing by tomorrow.",
        createdAt: "2023-05-14T16:45:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user2",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2023-05-10T09:00:00Z",
      },
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'Open' to 'In Progress'",
        timestamp: "2023-05-11T11:30:00Z",
      },
      {
        user: {
          id: "user3",
          name: "Mike Johnson",
          email: "mike@example.com",
          avatarUrl: "",
        },
        action: "Added label 'urgent'",
        timestamp: "2023-05-13T14:20:00Z",
      },
    ],
  },
  {
    id: "2",
    key: "PROJ-124",
    summary: "Implement new dashboard analytics features",
    description: "Add new charts and metrics to the admin dashboard based on the latest design specs.",
    status: "Open",
    priority: "Medium",
    type: "Feature",
    assignee: null,
    reporter: {
      id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatarUrl: "",
    },
    createdAt: "2023-05-12T13:45:00Z",
    updatedAt: "2023-05-12T13:45:00Z",
    dueDate: "2023-06-01T00:00:00Z",
    components: ["Dashboard", "Analytics"],
    labels: ["feature", "ui"],
    comments: [],
    activityLog: [
      {
        user: {
          id: "user3",
          name: "Mike Johnson",
          email: "mike@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2023-05-12T13:45:00Z",
      },
    ],
  },
  {
    id: "3",
    key: "PROJ-125",
    summary: "Optimize database queries for product listing",
    description:
      "The product listing page is loading slowly due to inefficient database queries. Need to optimize for better performance.",
    status: "Open",
    priority: "Highest",
    type: "Task",
    assignee: {
      id: "user4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "",
    },
    createdAt: "2023-05-14T10:30:00Z",
    updatedAt: "2023-05-16T09:15:00Z",
    dueDate: "2023-05-25T00:00:00Z",
    components: ["Database", "Backend"],
    labels: ["performance", "optimization"],
    comments: [
      {
        id: "comment3",
        author: {
          id: "user4",
          name: "Sarah Williams",
          email: "sarah@example.com",
          avatarUrl: "",
        },
        content: "I've started analyzing the query performance. Will provide an update by EOD.",
        createdAt: "2023-05-15T14:20:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2023-05-14T10:30:00Z",
      },
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Assigned to Sarah Williams",
        timestamp: "2023-05-14T10:35:00Z",
      },
    ],
  },
  {
    id: "4",
    key: "PROJ-126",
    summary: "Update user documentation for v2.0 release",
    description: "Comprehensive update of all user documentation to reflect the changes in v2.0.",
    status: "Resolved",
    priority: "Low",
    type: "Task",
    assignee: {
      id: "user5",
      name: "Alex Brown",
      email: "alex@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatarUrl: "",
    },
    createdAt: "2023-05-05T11:20:00Z",
    updatedAt: "2023-05-15T16:45:00Z",
    dueDate: "2023-05-18T00:00:00Z",
    components: ["Documentation"],
    labels: ["documentation", "release"],
    comments: [
      {
        id: "comment4",
        author: {
          id: "user5",
          name: "Alex Brown",
          email: "alex@example.com",
          avatarUrl: "",
        },
        content: "Documentation updates completed. Ready for review.",
        createdAt: "2023-05-15T16:40:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user3",
          name: "Mike Johnson",
          email: "mike@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2023-05-05T11:20:00Z",
      },
      {
        user: {
          id: "user5",
          name: "Alex Brown",
          email: "alex@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'In Progress' to 'Resolved'",
        timestamp: "2023-05-15T16:45:00Z",
      },
    ],
  },
  {
    id: "5",
    key: "PROJ-127",
    summary: "Fix mobile responsive issues on checkout page",
    description: "The checkout page has layout issues on mobile devices smaller than 375px width.",
    status: "Blocked",
    priority: "High",
    type: "Bug",
    assignee: {
      id: "current-user",
      name: "Current User",
      email: "you@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user2",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "",
    },
    createdAt: "2023-05-13T09:15:00Z",
    updatedAt: "2023-05-16T11:30:00Z",
    dueDate: "2023-05-19T00:00:00Z",
    components: ["Frontend", "Mobile"],
    labels: ["bug", "ui", "mobile"],
    comments: [
      {
        id: "comment5",
        author: {
          id: "current-user",
          name: "Current User",
          email: "you@example.com",
          avatarUrl: "",
        },
        content: "I'm blocked on this because we need design input on how to handle the smallest screen sizes.",
        createdAt: "2023-05-16T11:25:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user2",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2023-05-13T09:15:00Z",
      },
      {
        user: {
          id: "current-user",
          name: "Current User",
          email: "you@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'In Progress' to 'Blocked'",
        timestamp: "2023-05-16T11:30:00Z",
      },
    ],
  },
  {
    id: "6",
    key: "PROJ-128",
    summary: "Implement single sign-on with Google",
    description: "Add Google as an SSO provider to the authentication system.",
    status: "In Progress",
    priority: "Medium",
    type: "Feature",
    assignee: {
      id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatarUrl: "",
    },
    createdAt: "2023-05-11T14:00:00Z",
    updatedAt: "2023-05-14T09:30:00Z",
    dueDate: "2023-05-30T00:00:00Z",
    components: ["Authentication"],
    labels: ["feature", "security"],
    comments: [],
    activityLog: [
      {
        user: {
          id: "user3",
          name: "Mike Johnson",
          email: "mike@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2023-05-11T14:00:00Z",
      },
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'Open' to 'In Progress'",
        timestamp: "2023-05-14T09:30:00Z",
      },
    ],
  },
  {
    id: "7",
    key: "PROJ-129",
    summary: "Investigate payment gateway timeout issues",
    description: "Some users are experiencing timeouts when completing payments during peak hours.",
    status: "Open",
    priority: "Highest",
    type: "Bug",
    assignee: {
      id: "user4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user2",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "",
    },
    createdAt: "2023-05-15T08:45:00Z",
    updatedAt: "2023-05-15T08:45:00Z",
    dueDate: "2023-05-22T00:00:00Z",
    components: ["Payments", "Backend"],
    labels: ["bug", "critical", "customer-impact"],
    comments: [],
    activityLog: [
      {
        user: {
          id: "user2",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2023-05-15T08:45:00Z",
      },
    ],
  },
  {
    id: "8",
    key: "PROJ-130",
    summary: "Add export to CSV functionality for reports",
    description: "Users need the ability to export report data to CSV format for further analysis.",
    status: "Closed",
    priority: "Low",
    type: "Feature",
    assignee: {
      id: "user5",
      name: "Alex Brown",
      email: "alex@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "",
    },
    createdAt: "2023-05-01T10:00:00Z",
    updatedAt: "2023-05-10T15:30:00Z",
    dueDate: null,
    components: ["Reporting", "Frontend"],
    labels: ["feature", "enhancement"],
    comments: [
      {
        id: "comment6",
        author: {
          id: "user5",
          name: "Alex Brown",
          email: "alex@example.com",
          avatarUrl: "",
        },
        content: "Feature implemented and tested. Ready for review.",
        createdAt: "2023-05-08T14:15:00Z",
      },
      {
        id: "comment7",
        author: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        content: "Looks good! Approved for release.",
        createdAt: "2023-05-10T11:20:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2023-05-01T10:00:00Z",
      },
      {
        user: {
          id: "user5",
          name: "Alex Brown",
          email: "alex@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'In Progress' to 'Resolved'",
        timestamp: "2023-05-08T14:20:00Z",
      },
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'Resolved' to 'Closed'",
        timestamp: "2023-05-10T15:30:00Z",
      },
    ],
  },
]

