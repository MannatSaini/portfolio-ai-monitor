"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, Bell, FileText } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const { toast } = useToast()

  const handleReportAccess = () => {
    toast({
      title: "Report access denied",
      description: "This is a private report. Access denied",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Glegs dashboard.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loan Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,678,320</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Credit Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">712</div>
            <p className="text-xs text-muted-foreground">+5 points since last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delinquency Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">-0.3% from previous month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <Bell className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Loan Portfolio Breakdown */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Loan Portfolio Breakdown</CardTitle>
            <CardDescription>Distribution by loan type and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border bg-muted flex flex-col items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Housing Loans</span>
                    </div>
                    <span className="text-sm font-medium">62%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[62%] rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Consumer Durables</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[15%] rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Secured Loans</span>
                    </div>
                    <span className="text-sm font-medium">13%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[13%] rounded-full bg-purple-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm">Unsecured Loans</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[10%] rounded-full bg-amber-500"></div>
                  </div>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground mt-4" />
              <span className="text-muted-foreground">Detailed Portfolio Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Risk Alerts</CardTitle>
            <CardDescription>Your most recent loan portfolio alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Increased delinquency in unsecured loans</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-amber-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Credit score decline in 30-40 age group</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Housing loan prepayments increased</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <Link href="/dashboard/alerts" className="block text-sm text-primary hover:underline mt-4">
                View all alerts →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age Demographics and Credit Bureau Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
            <CardDescription>Loan distribution by customer age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">18-25 years</span>
                  <span className="text-sm font-medium">8%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[8%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">26-35 years</span>
                  <span className="text-sm font-medium">27%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[27%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">36-45 years</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[35%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">46-60 years</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[30%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Bureau Insights</CardTitle>
            <CardDescription>Credit score distribution across portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Excellent (800+)</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[15%] rounded-full bg-green-600"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Good (740-799)</span>
                  <span className="text-sm font-medium">32%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[32%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fair (670-739)</span>
                  <span className="text-sm font-medium">38%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[38%] rounded-full bg-amber-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Poor (580-669)</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[12%] rounded-full bg-red-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Very Poor (&lt; 580)</span>
                  <span className="text-sm font-medium">3%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 w-[3%] rounded-full bg-red-600"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent AI Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <FileText className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Delinquency Risk Analysis by Loan Type</p>
                <p className="text-xs text-muted-foreground">Generated by AI • public • 2 days ago</p>
              </div>
              <Link href="/dashboard/insights/1" className="text-sm text-primary hover:underline">
                View →
              </Link>
            </div>
            <div className="flex items-center">
              <FileText className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Credit Score Trend Analysis by Age Group</p>
                <p className="text-xs text-muted-foreground">Generated by Yogesh Kumar • owner • 1 week ago</p>
              </div>
              <Link href="/dashboard/insights/2" className="text-sm text-primary hover:underline">
                View →
              </Link>
            </div>
            <div className="flex items-center">
              <FileText className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Underwriting Criteria Optimization Report</p>
                <p className="text-xs text-muted-foreground">Generated by Mannat Saini • private • 2 weeks ago</p>
              </div>
              <Link href="" onClick={handleReportAccess} className="text-sm text-primary hover:private report">
                View →
              </Link>
            </div>
            <Link href="/dashboard/insights" className="block text-sm text-primary hover:underline mt-4">
              View all reports →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
