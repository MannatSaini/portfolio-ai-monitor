"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Sparkles, Send, RotateCcw, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface AIPromptProps {
  defaultPrompt?: string
  defaultModel?: string
  onInferenceComplete?: (result: string) => void
  className?: string
}

export function AIPrompt({
  defaultPrompt =  `
  Based on your prompt, here's a thoughtful response:
  
  ## Analysis
  The question you've asked touches on several important aspects that are worth exploring in detail.
  
  ## Key Points
  - First, it's important to consider the context
  - Second, there are multiple perspectives to consider
  - Third, the evidence suggests several possible interpretations
  
  ## Conclusion
  In summary, this is a complex topic that requires careful consideration of multiple factors.
  
  I hope this helps! Let me know if you need any clarification or have follow-up questions.`,
  onInferenceComplete,
  className,
}: AIPromptProps) {
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [streamResponse, setStreamResponse] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string>("")
  const [isCopied, setIsCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"prompt" | "advanced" | "result">("prompt")

  const abortControllerRef = useRef<AbortController | null>(null)

  const handleSubmit = async () => {
    window.location.href = "/dashboard/insights";     
  }

  const handleCancel = () => {
      window.location.href = "/dashboard";
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-teal-500" />
          AI Prompt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsContent value="prompt" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Textarea readOnly
              id="prompt"
              className="min-h-[200px] min-w-[600px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <div className="flex space-x-2">
          <Button onClick={handleSubmit}>
          Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
