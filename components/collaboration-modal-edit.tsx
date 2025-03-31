"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Users, Save, X, Share2, Send, Slack } from "lucide-react"
import { toast } from "@/components/ui/use-toast";
import { DialogTitle } from "@radix-ui/react-dialog"

interface CollaborationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialContext?: {
    type: string
    title: string
  }
}

export function CollaborationModal({
  open,
  onOpenChange,
  initialContext = { type: "delinquency", title: "Delinquency Analysis" },
}: CollaborationModalProps) {
  const [title, setTitle] = useState(initialContext.title || "Untitled")
 
  const handleShareToSlack = () => {
    // Add logic to share to Slack here
    toast({
      title: "Shared on Slack",
      description: "The report has been successfully shared on Slack!",
    });
  };

  const handleExportToGoogleWorkspace = () => {
     // Add logic to export to google here
    toast({
      title: "Exported to Google",
      description: "The report has been successfully exported to your google workspace",
    });
  };

  const comments = [
    {
      id: 1,
      user: "Sarah Connor",
      content: "I think we should investigate the increase in delinquency rates for personal loans further.",
      timestamp: "10 minutes ago",
    },
    {
      id: 2,
      user: "John Doe",
      content: "Agreed. I'll look into the correlation with recent marketing campaigns.",
      timestamp: "5 minutes ago",
    },
  ]

  const collaborators = [
    { id: 1, name: "John Doe", status: "active" },
    { id: 2, name: "Sarah Connor", status: "idle" },
    { id: 3, name: "Emily Johnson", status: "offline" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 bg-white shadow-lg rounded-lg">
        <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between bg-gray-50">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-sm border-0 text-lg font-medium focus-visible:ring-0 bg-transparent"
            placeholder="Untitled"
          />
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Main content area */}
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            <div className="prose prose-sm max-w-3xl mx-auto">
              <h1 className="text-xl font-bold text-gray-800">Delinquency Analysis</h1>
              <p className="text-gray-600">
                The delinquency rates across all loan types have shown a concerning upward trend over the past 7 months.
                Personal loans have experienced the highest rate of increase, rising from 3.2% in January to 5.2% in
                July, representing a 62.5% increase.
              </p>
              <h2 className="text-lg font-semibold text-gray-700">Key Findings</h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Business loans have the highest absolute delinquency rate at 6.1% in July</li>
                <li>Mortgages maintain the lowest delinquency rates throughout the period, staying below 2%</li>
                <li>The acceleration in delinquency rates appears to have increased in the April-July period</li>
              </ul>
              <p className="text-gray-600">
                This suggests a potential systemic issue that warrants further investigation. We should examine the
                correlation between these trends and recent changes in underwriting criteria, economic indicators, and
                marketing campaigns.
              </p>
              <h2 className="text-lg font-semibold text-gray-700">Recommendations</h2>
              <ol className="list-decimal pl-5 text-gray-600">
                <li>Review underwriting criteria for personal and business loans</li>
                <li>Analyze customer segments showing the highest delinquency increases</li>
                <li>Evaluate the impact of recent marketing campaigns on loan quality</li>
                <li>Consider adjusting risk models to account for the observed trends</li>
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72 border-l flex flex-col bg-gray-50">
            <Tabs defaultValue="comments" className="flex-1 flex flex-col">
              <TabsList className="w-full rounded-none border-b bg-gray-100">
                <TabsTrigger value="comments" className="flex-1 text-gray-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comments
                </TabsTrigger>
                <TabsTrigger value="people" className="flex-1 text-gray-700">
                  <Users className="h-4 w-4 mr-2" />
                  People
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comments" className="flex-1 p-0 m-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-3 bg-white shadow-sm">
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8 bg-gray-200">
                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-800">{comment.user}</span>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm mt-1 text-gray-600">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="people" className="flex-1 p-0 m-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Collaborators</h3>
                    <div className="space-y-2">
                      {collaborators.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 bg-gray-200">
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{user.name}</p>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`h-2 w-2 rounded-full ${
                                    user.status === "active"
                                      ? "bg-green-500"
                                      : user.status === "idle"
                                      ? "bg-yellow-500"
                                      : "bg-gray-300"
                                  }`}
                                />
                                <span className="text-xs text-gray-500">
                                  {user.status === "active"
                                    ? "Active now"
                                    : user.status === "idle"
                                    ? "Idle"
                                    : "Offline"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <DialogFooter className="px-6 py-4 border-t bg-gray-50 flex justify-end">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleShareToSlack}>
            <Slack className="h-4 w-4 mr-2" />
            Share to Slack
          </Button>
          <Button onClick={handleExportToGoogleWorkspace}>
            <Send className="h-4 w-4 mr-2" />
            Export to Google Workspace
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Add Comments
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
