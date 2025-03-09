"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Share2, Plus, Filter, Calendar, BarChart3, PieChart, Sparkles, Home,Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function ReportsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  const predefinedReports = [
    {
      id: 1,
      title: "Delinquency Risk Analysis by Loan Type",
      description: "Comprehensive analysis of delinquency risk factors across different loan types.",
      date: "Feb 15, 2025",
      type: "Risk Analysis",
      icon: BarChart3,
      loanType: "All Loans",
    },
    {
      id: 2,
      title: "Credit Score Trend Analysis by Age Group",
      description: "Analysis of credit score trends across different customer age groups.",
      date: "Jan 10, 2025",
      type: "Demographics",
      icon: PieChart,
      loanType: "All Loans",
    },
    {
      id: 3,
      title: "Housing Loan Performance Report",
      description: "Detailed performance metrics for the housing loan portfolio.",
      date: "Dec 15, 2024",
      type: "Performance",
      icon: Home,
      loanType: "Housing Loans",
    },
    {
      id: 4,
      title: "Underwriting Criteria Optimization",
      description: "AI-generated recommendations for optimizing underwriting criteria.",
      date: "Mar 01, 2025",
      type: "AI Analysis",
      icon: Sparkles,
      loanType: "All Loans",
    },
  ]

  const handleGenerateAIReport = () => {
    setIsGenerating(true)

    // Simulate AI report generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "AI Insights Generated",
        description: "Your custom loan portfolio AI insights has been successfully generated.",
      })
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Loan Portfolio Insights</h1>
        <p className="text-muted-foreground">
          Access predefined insights and generate custom AI insights for your loan portfolio.
        </p>
      </div>

      {/* Report Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Insights
        </Button>
      </div>

      {/* AI Report Generator */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
             AI Insight Generator
          </CardTitle>
          <CardDescription>Generate custom insights using our advanced AI technology</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Our AI can analyze your loan portfolio and generate custom insights based on your specific needs. Simply
              describe what you're looking for, and our AI will create a detailed insights for you.
            </p>
            <div className="rounded-md border p-4 bg-white dark:bg-gray-900">
              <h3 className="font-medium mb-2">Example prompts:</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• "Analyze delinquency risk factors for unsecured loans in the 25-35 age group"</li>
                <li>• "Generate a insight on credit score trends across different loan types"</li>
                <li>• "Create a housing loan performance analysis with recommendations"</li>
                <li>• "Analyze the effectiveness of current underwriting criteria for consumer durables"</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleGenerateAIReport} disabled={isGenerating}>
            {isGenerating ? (
              <>Generating Insights...</>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Insights
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Predefined Reports */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Predefined Insights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {predefinedReports.map((report) => {
            const Icon = report.icon
            return (
              <Card key={report.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription className="mt-1">{report.description}</CardDescription>
                  </div>
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{report.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                        {report.type}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                        {report.loanType}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button size="sm" onClick={() => router.push("/dashboard/reviews")}>
                    <Eye className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Insights</CardTitle>
          <CardDescription>Your recently viewed and generated insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <FileText className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Unsecured Loan Risk Assessment</p>
                <p className="text-xs text-muted-foreground">Generated by AI • public • Today</p>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center">
              <FileText className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Monthly Portfolio Performance</p>
                <p className="text-xs text-muted-foreground">System Generated • public • Yesterday</p>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center">
              <FileText className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Credit Bureau Integration Audit</p>
                <p className="text-xs text-muted-foreground">System Generated • public • 3 days ago</p>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
