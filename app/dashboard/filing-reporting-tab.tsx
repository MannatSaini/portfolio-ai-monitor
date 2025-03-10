"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function FilingReportingTab() {
  const [activeTab, setActiveTab] = useState("internal")

  const internalReports = [
    {
      id: "mbr",
      title: "Monthly Business Review",
      description: "Comprehensive monthly overview of business performance, KPIs, and strategic initiatives.",
      frequency: "Monthly",
      lastGenerated: "15 Apr 2023",
      dueDate: "5th of every month",
    },
    {
      id: "qbr",
      title: "Quarterly Business Review",
      description: "In-depth analysis of quarterly performance, market trends, and financial projections.",
      frequency: "Quarterly",
      lastGenerated: "10 Mar 2023",
      dueDate: "15th of quarter end month",
    },
    {
      id: "annual",
      title: "Annual Performance Report",
      description:
        "Year-end summary of business achievements, challenges, and strategic planning for the next fiscal year.",
      frequency: "Annually",
      lastGenerated: "20 Jan 2023",
      dueDate: "January 31st",
    },
  ]

  const regulatoryReports = [
    {
      id: "fed",
      title: "Federal Reserve Reporting",
      description:
        "Mandatory reporting to the Federal Reserve including capital adequacy, liquidity, and risk exposure.",
      frequency: "Quarterly",
      lastGenerated: "28 Mar 2023",
      dueDate: "30 days after quarter end",
      authority: "Federal Reserve",
    },
    {
      id: "fca",
      title: "FCA Compliance Reporting",
      description:
        "Financial Conduct Authority required reporting on conduct, customer outcomes, and regulatory compliance.",
      frequency: "Bi-annually",
      lastGenerated: "15 Feb 2023",
      dueDate: "June 30th & December 31st",
      authority: "Financial Conduct Authority",
    },
    {
      id: "aml",
      title: "AML/KYC Compliance Report",
      description: "Anti-Money Laundering and Know Your Customer compliance reporting for regulatory oversight.",
      frequency: "Monthly",
      lastGenerated: "5 Apr 2023",
      dueDate: "10th of every month",
      authority: "FinCEN/Local Regulator",
    },
  ]

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Filing & Reporting</h2>
        <p className="text-muted-foreground">Manage your internal and regulatory reporting templates and submissions</p>
      </div>

      <Tabs defaultValue="internal" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="internal">Internal Reports</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="internal" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {internalReports.map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.frequency}
                    </Badge>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Last Generated</span>
                      <span>{report.lastGenerated}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Due Date</span>
                      <span>{report.dueDate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    Generate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regulatory" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regulatoryReports.map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900">
                      {report.authority}
                    </Badge>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Frequency</span>
                      <span>{report.frequency}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Due Date</span>
                      <span>{report.dueDate}</span>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Submitted:</span>
                    <span>{report.lastGenerated}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Template
                  </Button>
                  <Button size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    File Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

