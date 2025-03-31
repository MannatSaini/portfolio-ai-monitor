"use client"

import { useState } from "react"
import type { Ticket } from "@/types/ticket"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow, format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface TicketDetailsProps {
  ticket: Ticket
}

export function TicketDetails({ ticket }: TicketDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(ticket.comments || [])
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
    <div className="p-6 bg-muted/30">
      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{ticket.summary}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                      <p className="mt-1">{ticket.description || "No description provided."}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                      <p className="mt-1">{ticket.type}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Components</h4>
                      <p className="mt-1">{ticket.components?.join(", ") || "No components assigned."}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Labels</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {ticket.labels?.map((label) => (
                          <span key={label} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {label}
                          </span>
                        )) || "No labels assigned."}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Assignee</h4>
                    <div className="flex items-center mt-1">
                      {ticket.assignee ? (
                        <>
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={ticket.assignee.avatarUrl} alt={ticket.assignee.name} />
                            <AvatarFallback>{ticket.assignee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{ticket.assignee.name}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Reporter</h4>
                    <div className="flex items-center mt-1">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={ticket.reporter.avatarUrl} alt={ticket.reporter.name} />
                        <AvatarFallback>{ticket.reporter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{ticket.reporter.name}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                    <p className="mt-1">
                      {format(new Date(ticket.createdAt), "PPP 'at' p")} (
                      {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })})
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Updated</h4>
                    <p className="mt-1">
                      {format(new Date(ticket.updatedAt), "PPP 'at' p")} (
                      {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })})
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                    <p className="mt-1">
                      {ticket.dueDate ? (
                        <>
                          {format(new Date(ticket.dueDate), "PPP")} (
                          {formatDistanceToNow(new Date(ticket.dueDate), { addSuffix: true })})
                        </>
                      ) : (
                        <span className="text-muted-foreground">No due date</span>
                      )}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Epic Link</h4>
                    <p className="mt-1">
                      {ticket.epicLink ? (
                        <a href="#" className="text-primary hover:underline">
                          {ticket.epicLink}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">No epic link</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{comment.author.name}</span>
                            <span className="text-muted-foreground text-sm ml-2">
                              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">{comment.content}</div>
                      </div>
                    </div>
                  ))
                )}

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Add a comment</h4>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="min-h-[100px]"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button onClick={handleAddComment} disabled={!newComment.trim() || isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Comment"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {ticket.activityLog?.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-1 h-full bg-muted-foreground/30 rounded-full" />
                    <div>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                          <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{activity.action}</p>
                    </div>
                  </div>
                )) || <p className="text-center text-muted-foreground py-4">No activity recorded for this ticket.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

