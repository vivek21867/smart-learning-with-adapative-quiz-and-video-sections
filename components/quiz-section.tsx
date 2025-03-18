"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, ArrowRight } from "lucide-react"

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which algorithm is best suited for classification problems?",
    options: ["Linear Regression", "Decision Trees", "K-means Clustering", "Principal Component Analysis"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What is the main difference between supervised and unsupervised learning?",
    options: [
      "Supervised learning requires more computational power",
      "Unsupervised learning always performs better",
      "Supervised learning uses labeled data while unsupervised does not",
      "Unsupervised learning is only used for image processing",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "Which of the following is an example of reinforcement learning?",
    options: [
      "Predicting house prices based on historical data",
      "Clustering customers based on purchasing behavior",
      "Teaching a computer to play chess by rewarding good moves",
      "Identifying spam emails based on content",
    ],
    correctAnswer: 2,
  },
]

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleOptionSelect = (value: string) => {
    setSelectedOption(Number.parseInt(value))
  }

  const checkAnswer = () => {
    if (selectedOption === null) return

    setIsAnswered(true)
    setShowExplanation(true)

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    setSelectedOption(null)
    setIsAnswered(false)
    setShowExplanation(false)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
          <CardDescription>
            You scored {score} out of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-6">
            <div className="relative mb-4">
              <div className="h-32 w-32 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {Math.round((score / questions.length) * 100)}%
                </span>
              </div>
            </div>
            <p className="text-center mb-4">
              {score === questions.length
                ? "Excellent! You've mastered this topic."
                : score >= questions.length / 2
                  ? "Good job! You're making progress."
                  : "Keep practicing! You'll improve with time."}
            </p>
            <div className="w-full p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4">
              <h3 className="font-medium mb-2">AI Recommendation:</h3>
              <p className="text-sm">
                Based on your performance, we recommend focusing on understanding the fundamentals of
                {score < questions.length / 2
                  ? " supervised vs. unsupervised learning"
                  : " advanced classification techniques"}
                .
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetQuiz}>
            Retry Quiz
          </Button>
          <Button className="bg-green-500 hover:bg-green-600">Continue to Next Lesson</Button>
        </CardFooter>
      </Card>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Interactive Quiz</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="text-sm font-medium">
            Score: {score}/{currentQuestion}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
          <RadioGroup value={selectedOption?.toString()} onValueChange={handleOptionSelect}>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-md border ${
                    isAnswered && index === selectedOption
                      ? index === currentQ.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : isAnswered && index === currentQ.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswered} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                  {isAnswered && index === currentQ.correctAnswer && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {isAnswered && index === selectedOption && index !== currentQ.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {showExplanation && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
            <h4 className="font-medium mb-2">Explanation:</h4>
            <p className="text-sm">
              {currentQuestion === 0
                ? "Decision Trees are well-suited for classification problems because they can create complex decision boundaries and are easy to interpret."
                : currentQuestion === 1
                  ? "The key difference is that supervised learning uses labeled data (with known outputs) to train models, while unsupervised learning works with unlabeled data to find patterns."
                  : "Reinforcement learning involves an agent learning to make decisions by performing actions and receiving rewards or penalties, similar to how one might learn to play chess."}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isAnswered ? (
          <Button onClick={checkAnswer} disabled={selectedOption === null} className="bg-green-500 hover:bg-green-600">
            Check Answer
          </Button>
        ) : (
          <Button onClick={nextQuestion} className="bg-green-500 hover:bg-green-600">
            {currentQuestion < questions.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Quiz"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

