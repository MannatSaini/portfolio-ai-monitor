"use client"

import { useState } from "react"
import { MessageSquare, Eye, EyeOff, Clock, User, History, Plus, Search, Filter, SortAsc, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CollaborationPanel() {
  const [showAnnotationForm, setShowAnnotationForm] = useState(false)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>Collaborate with your team on risk insights</CardDescription>
            </div>
            <Button onClick={() => setShowAnnotationForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Annotation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="annotations">
            <TabsList className="mb-4">
              <TabsTrigger value="annotations">Annotations</TabsTrigger>
              <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            </TabsList>

            <TabsContent value="annotations">
              <div className="mb-4 flex items-center gap-2">
                <Input
                  placeholder="Search annotations..."
                  className="max-w-sm"
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sort
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <Card key={i}>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback>{`U${i % 5}`}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {i % 3 === 0 ? "Sarah Connor" : i % 3 === 1 ? "John Doe" : "Emily Johnson"}
                              </p>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {i % 2 === 0 ? "2 hours ago" : "Yesterday"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {i % 2 === 0 ? (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <EyeOff className="h-3 w-3" />
                                Private
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                Public
                              </Badge>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <span className="sr-only">Actions</span>
                                  <span className="text-xs">•••</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Reply</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div>
                          <p className="text-sm">
                            {i % 3 === 0
                              ? "The increase in delinquency for personal loans needs further investigation. I've noticed a correlation with recent marketing campaigns targeting high-risk segments."
                              : i % 3 === 1
                                ? "Underwriting performance for the 'Young Professional' segment has degraded significantly. We should review our credit scoring model for this segment."
                                : "The regional variation in delinquency rates suggests we may need to adjust our risk models to account for local economic factors."}
                          </p>
                          <div className="mt-2">
                            <Badge variant="outline">
                              {i % 3 === 0
                                ? "Delinquency Analysis"
                                : i % 3 === 1
                                  ? "Underwriting Performance"
                                  : "Regional Analysis"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Context
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="audit">
              <div className="mb-4 flex items-center gap-2">
                <Input
                  placeholder="Search audit trail..."
                  className="max-w-sm"
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <div key={i} className="flex items-start gap-4 border-b pb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {i % 4 === 0 && <MessageSquare className="h-4 w-4" />}
                        {i % 4 === 1 && <User className="h-4 w-4" />}
                        {i % 4 === 2 && <Eye className="h-4 w-4" />}
                        {i % 4 === 3 && <History className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {i % 3 === 0 ? "Sarah Connor" : i % 3 === 1 ? "John Doe" : "Emily Johnson"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {i % 4 === 0
                              ? "added an annotation"
                              : i % 4 === 1
                                ? "viewed a report"
                                : i % 4 === 2
                                  ? "exported data"
                                  : "created an action"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i % 4 === 0
                            ? "Added annotation to Delinquency Analysis"
                            : i % 4 === 1
                              ? "Viewed Underwriting Performance Report"
                              : i % 4 === 2
                                ? "Exported Delinquency Data"
                                : "Created action for CRO approval"}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {i % 2 === 0 ? "2 hours ago" : "Yesterday"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showAnnotationForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Annotation</CardTitle>
            <CardDescription>Add a new annotation to share insights with your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Context</label>
                <Select defaultValue="delinquency">
                  <SelectTrigger>
                    <SelectValue placeholder="Select context" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delinquency">Delinquency Analysis</SelectItem>
                    <SelectItem value="underwriting">Underwriting Performance</SelectItem>
                    <SelectItem value="regional">Regional Analysis</SelectItem>
                    <SelectItem value="customer">Customer Segment Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Annotation</label>
                <Textarea placeholder="Enter your annotation..." className="min-h-[100px]" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Visibility:</label>
                  <Select defaultValue="public">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>Public</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <EyeOff className="h-4 w-4" />
                          <span>Private</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Notify:</label>
                  <Select defaultValue="none">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No one</SelectItem>
                      <SelectItem value="team">My Team</SelectItem>
                      <SelectItem value="all">All Collaborators</SelectItem>
                      <SelectItem value="specific">Specific Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAnnotationForm(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAnnotationForm(false)}>Save Annotation</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

