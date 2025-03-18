"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Video, FileText, Lightbulb, Send, Loader2, Play } from "lucide-react"

type Message = {
  id: string
  content: string
  type: "user" | "ai"
  format?: "text" | "video" | "diagram"
}

export default function DoubtResolver() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [responseFormat, setResponseFormat] = useState<"text" | "video" | "diagram">("text")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: question,
      type: "user",
    }

    setMessages([...messages, newUserMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message

      if (responseFormat === "text") {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: generateTextResponse(question),
          type: "ai",
          format: "text",
        }
      } else if (responseFormat === "video") {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "AI-generated video explanation",
          type: "ai",
          format: "video",
        }
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "AI-generated diagram explanation",
          type: "ai",
          format: "diagram",
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
      setQuestion("")
    }, 1500)
  }

  const generateTextResponse = (query: string) => {
    // Simple response generation based on keywords
    if (query.toLowerCase().includes("decision tree")) {
      return "Decision trees are a non-parametric supervised learning method used for classification and regression. The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features. A tree can be seen as a piecewise constant approximation.\n\nKey advantages of decision trees:\n- Easy to understand and interpret\n- Requires little data preparation\n- Can handle both numerical and categorical data\n- Uses a white box model (if a given situation is observable in a model, the explanation for the condition is easily explained)"
    } else if (query.toLowerCase().includes("supervised") || query.toLowerCase().includes("unsupervised")) {
      return "Supervised learning uses labeled training data to learn the mapping function that turns input variables (X) into the output variable (Y). The goal is to approximate the mapping function so well that when you have new input data (X), you can predict the output variables (Y) for that data.\n\nUnsupervised learning, in contrast, uses unlabeled training data. The goal is to model the underlying structure or distribution in the data in order to learn more about the data. These algorithms discover hidden patterns or data groupings without the need for human intervention."
    } else {
      return "In machine learning, models are trained using data to make predictions or decisions without being explicitly programmed to perform the task. There are several types of machine learning:\n\n1. Supervised Learning: Uses labeled data\n2. Unsupervised Learning: Uses unlabeled data to find patterns\n3. Reinforcement Learning: Learns through trial and error with rewards\n\nThe choice of algorithm depends on your specific problem, data availability, and desired outcomes. Would you like me to explain any specific concept in more detail?"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-green-500" />
          AI Doubt Resolution
        </CardTitle>
        <CardDescription>Ask any question about the lesson and get instant AI-generated explanations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Tabs value={responseFormat} onValueChange={(v) => setResponseFormat(v as any)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="text" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>Video</span>
              </TabsTrigger>
              <TabsTrigger value="diagram" className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                <span>Diagram</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto p-1">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Ask any question about machine learning concepts</p>
              <p className="text-sm mt-1">
                For example: "What is a decision tree?" or "Explain supervised vs unsupervised learning"
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.type === "user" ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {message.format === "video" ? (
                    <div className="bg-black rounded-md aspect-video flex items-center justify-center mb-2">
                      <Play className="h-8 w-8 text-white opacity-70" />
                    </div>
                  ) : message.format === "diagram" ? (
                    <div className="bg-white dark:bg-gray-700 rounded-md p-3 mb-2">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="AI-generated diagram"
                        className="w-full h-auto"
                      />
                    </div>
                  ) : null}
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[60px]"
          />
          <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={isLoading || !question.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

