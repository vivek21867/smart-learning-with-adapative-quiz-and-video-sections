import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, BookOpen, Lightbulb, ListChecks } from "lucide-react"

export default function SmartNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-500" />
          Smart Notes & Summaries
        </CardTitle>
        <CardDescription>AI-generated notes based on your learning progress and quiz performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="key-concepts">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="key-concepts" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Key Concepts</span>
            </TabsTrigger>
            <TabsTrigger value="common-mistakes" className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-1">
              <ListChecks className="h-4 w-4" />
              <span>Practice</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="key-concepts" className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Introduction to Machine Learning</h3>
              <p>
                Machine learning is a subset of artificial intelligence that provides systems the ability to
                automatically learn and improve from experience without being explicitly programmed.
              </p>

              <h4>Types of Machine Learning</h4>
              <ul>
                <li>
                  <strong>Supervised Learning:</strong> The algorithm learns from labeled training data, helping it to
                  predict outcomes for unforeseen data.
                  <ul>
                    <li>Examples: Classification, Regression</li>
                    <li>Algorithms: Decision Trees, Random Forest, Neural Networks</li>
                  </ul>
                </li>
                <li>
                  <strong>Unsupervised Learning:</strong> The algorithm learns patterns from unlabeled data.
                  <ul>
                    <li>Examples: Clustering, Association</li>
                    <li>Algorithms: K-means, Hierarchical Clustering, PCA</li>
                  </ul>
                </li>
                <li>
                  <strong>Reinforcement Learning:</strong> The algorithm learns by interacting with an environment and
                  receiving rewards or penalties.
                  <ul>
                    <li>Examples: Game playing, Robotics</li>
                    <li>Algorithms: Q-Learning, Deep Q Network (DQN)</li>
                  </ul>
                </li>
              </ul>

              <h4>Key Terminology</h4>
              <ul>
                <li>
                  <strong>Features:</strong> The input variables used for prediction
                </li>
                <li>
                  <strong>Labels:</strong> The output variable being predicted
                </li>
                <li>
                  <strong>Training:</strong> The process of learning from data
                </li>
                <li>
                  <strong>Inference:</strong> Using the trained model to make predictions
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="common-mistakes" className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Learning Insights</h3>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg mb-4">
                <h4 className="text-amber-800 dark:text-amber-300 mt-0">Areas for Improvement</h4>
                <p className="mb-0">Based on your quiz performance, you might need to focus more on:</p>
                <ul className="mb-0">
                  <li>Understanding the differences between supervised and unsupervised learning</li>
                  <li>Identifying appropriate algorithms for specific problem types</li>
                </ul>
              </div>

              <h4>Common Misconceptions</h4>
              <ul>
                <li>
                  <strong>Misconception:</strong> Machine learning can solve any problem with enough data.
                  <br />
                  <strong>Reality:</strong> Machine learning has limitations and is not suitable for all types of
                  problems, especially those requiring causal reasoning.
                </li>
                <li>
                  <strong>Misconception:</strong> More complex models always perform better.
                  <br />
                  <strong>Reality:</strong> Simpler models often generalize better to new data and are less prone to
                  overfitting.
                </li>
              </ul>

              <h4>Personalized Tips</h4>
              <ul>
                <li>Try creating a comparison table of different algorithms and their use cases</li>
                <li>Practice identifying which type of learning applies to different scenarios</li>
                <li>Review the decision tree concept with additional examples</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Practice Questions</h3>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">
                    1. You want to predict house prices based on features like square footage, number of bedrooms, and
                    location. Which type of machine learning would be most appropriate?
                  </p>
                  <ul className="mb-0">
                    <li>A) Supervised Learning (Regression)</li>
                    <li>B) Unsupervised Learning (Clustering)</li>
                    <li>C) Reinforcement Learning</li>
                    <li>D) Semi-supervised Learning</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hint: Think about whether you have labeled data (known house prices) for training.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="font-medium">2. Which of the following is NOT a characteristic of decision trees?</p>
                  <ul className="mb-0">
                    <li>A) They can handle both numerical and categorical data</li>
                    <li>B) They are resistant to outliers</li>
                    <li>C) They require extensive data preprocessing</li>
                    <li>D) They are easy to interpret</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hint: Consider the data preparation requirements for decision trees compared to other algorithms.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="font-medium">
                    3. You have a dataset of customer transactions but no specific target variable. You want to identify
                    natural groupings of customers with similar purchasing behaviors. Which approach should you use?
                  </p>
                  <ul className="mb-0">
                    <li>A) Classification</li>
                    <li>B) Regression</li>
                    <li>C) Clustering</li>
                    <li>D) Dimensionality Reduction</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hint: Think about which approach is used to find patterns in unlabeled data.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Notes
        </Button>
        <Button className="bg-green-500 hover:bg-green-600">Generate Custom Practice Set</Button>
      </CardFooter>
    </Card>
  )
}

