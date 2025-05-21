"use client"

import { useState } from "react"
import type { Ticket } from "@/types/ticket"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow, format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface JiraTicket {
  id: string;
  key: string;
  self: string;
  fields: {
    summary: string;
    description: string | null;
    status: {
      id: string;
      name: string;
    };
    priority: {
      id: string;
      name: string;
    };
    issuetype: {
      id: string;
      name: string;
    };
    assignee?: {
      displayName: string;
      emailAddress: string;
    };
    reporter?: {
      displayName: string;
      emailAddress: string;
    };
    created: string;
    updated: string;
    duedate?: string;
  };
}

interface TicketDetailsProps {
  ticket: JiraTicket;
}

export function TicketDetails({ ticket }: TicketDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(ticket.fields.comments || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/tickets/${ticket.id}/comments`, {
      //   method: "POST",
      //   body: JSON.stringify({ content: newComment }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newCommentObj = {
        id: `comment-${Date.now()}`,
        author: {
          id: "current-user",
          name: "Current User",
          email: "user@example.com",
          avatarUrl: "",
        },
        content: newComment,
        createdAt: new Date().toISOString(),
      }

      setComments([...comments, newCommentObj])
      setNewComment("")

      toast({
        title: "Comment added",
        description: "Your comment has been added to the ticket.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{ticket.fields.summary}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Details</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd>
                    <Badge className="mt-1">{ticket.fields.status.name}</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Priority</dt>
                  <dd>
                    <Badge className="mt-1">{ticket.fields.priority.name}</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Type</dt>
                  <dd>
                    <Badge variant="outline" className="mt-1">
                      {ticket.fields.issuetype.name}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Created</dt>
                  <dd className="mt-1">
                    {ticket.fields.created ? (
                      formatDistanceToNow(new Date(ticket.fields.created), { addSuffix: true })
                    ) : (
                      <span className="text-muted-foreground">No date</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Updated</dt>
                  <dd className="mt-1">
                    {ticket.fields.updated ? (
                      formatDistanceToNow(new Date(ticket.fields.updated), { addSuffix: true })
                    ) : (
                      <span className="text-muted-foreground">No date</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Due Date</dt>
                  <dd className="mt-1">
                    {ticket.fields.duedate ? (
                      formatDistanceToNow(new Date(ticket.fields.duedate), { addSuffix: true })
                    ) : (
                      <span className="text-muted-foreground">No due date</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">People</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Assignee</dt>
                  <dd>
                    {ticket.fields.assignee ? (
                      <div className="flex items-center mt-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback>
                            {ticket.fields.assignee.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{ticket.fields.assignee.displayName}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground mt-1">Unassigned</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Reporter</dt>
                  <dd>
                    {ticket.fields.reporter ? (
                      <div className="flex items-center mt-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback>
                            {ticket.fields.reporter.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{ticket.fields.reporter.displayName}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground mt-1">Unknown</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          {ticket.fields.description && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
              <div className="prose prose-sm max-w-none">
                {ticket.fields.description}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

