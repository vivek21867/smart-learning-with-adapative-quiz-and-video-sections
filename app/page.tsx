import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, BookOpen, HelpCircle, BarChart3, Play } from "lucide-react"
import Link from "next/link"
import VideoPlayer from "@/components/video-player"
import QuizSection from "@/components/quiz-section"
import DoubtResolver from "@/components/doubt-resolver"
import SmartNotes from "@/components/smart-notes"
import LearningAssistant from "@/components/learning-assistant"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-500" />
            <h1 className="text-xl font-bold">SmartLearn AI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-green-500 transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-500 transition-colors">
              My Courses
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-500 transition-colors">
              Progress
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-500 transition-colors">
              Notes
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Support
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600">
              <BookOpen className="h-4 w-4 mr-2" />
              My Learning
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">Introduction to Machine Learning</CardTitle>
                    <CardDescription>Adaptive lesson based on your previous quiz performance</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">Difficulty:</span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <VideoPlayer />
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Button>
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  Next Lesson
                  <Play className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="quiz">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="quiz">Interactive Quiz</TabsTrigger>
                <TabsTrigger value="doubt">Doubt Resolution</TabsTrigger>
                <TabsTrigger value="notes">Smart Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="quiz" className="mt-0">
                <QuizSection />
              </TabsContent>
              <TabsContent value="doubt" className="mt-0">
                <DoubtResolver />
              </TabsContent>
              <TabsContent value="notes" className="mt-0">
                <SmartNotes />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Course Completion</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quiz Performance</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement Score</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "91%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <LearningAssistant />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Complete the "Decision Trees" practice exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Review your notes on "Supervised vs. Unsupervised Learning"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Watch the supplementary video on "Feature Engineering"</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-500 hover:bg-green-600">View Personalized Study Plan</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

