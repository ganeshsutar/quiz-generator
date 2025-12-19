import { Link } from "react-router-dom";
import { useQuizzes } from "@/hooks/useQuizzes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Trophy, Clock } from "lucide-react";

export function HomePage() {
  const { quizzes, runningQuizzes, completedQuizzes } = useQuizzes();

  const totalQuestions = completedQuizzes.reduce(
    (acc, q) => acc + (q.totalQuestions ?? 0),
    0
  );
  const totalCorrect = completedQuizzes.reduce(
    (acc, q) => acc + (q.score ?? 0),
    0
  );
  const averageScore = totalQuestions > 0
    ? Math.round((totalCorrect / totalQuestions) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Quiz Generator</h1>
        <p className="text-muted-foreground">
          Test your knowledge with timed quizzes across various topics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Total Quizzes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{quizzes.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Average Score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{averageScore}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              In Progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{runningQuizzes.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            Start a new quiz or continue where you left off
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Link to="/quiz/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Quiz
            </Button>
          </Link>
          {runningQuizzes.length > 0 && (
            <Link to={`/quiz/${runningQuizzes[0].id}`}>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Continue Quiz
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Recent Completed */}
      {completedQuizzes.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>Your latest completed quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {completedQuizzes.slice(0, 5).map((quiz) => (
                <Link
                  key={quiz.id}
                  to={`/quiz/${quiz.id}/results`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-medium">{quiz.questionSetName ?? "Quiz"}</p>
                    <p className="text-sm text-muted-foreground">
                      {quiz.completedAt
                        ? new Date(quiz.completedAt).toLocaleDateString()
                        : "Recently"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {quiz.score}/{quiz.totalQuestions}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round(((quiz.score ?? 0) / (quiz.totalQuestions ?? 1)) * 100)}%
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
