import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuiz } from "@/hooks/useQuizzes";
import { getQuizAnswers, getQuestionsByIds } from "@/hooks/useQuiz";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, CheckCircle2, XCircle, Home, RotateCcw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Schema } from "../../amplify/data/resource";

type Question = Schema["Question"]["type"];
type QuizAnswer = Schema["QuizAnswer"]["type"];

interface QuestionResult {
  question: Question;
  answer: QuizAnswer;
}

export function ResultsPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { quiz, loading: loadingQuiz } = useQuiz(quizId);

  const [results, setResults] = useState<QuestionResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      if (!quiz?.questionIds || !quizId) return;

      setLoading(true);
      try {
        const validQuestionIds = quiz.questionIds.filter((id): id is string => id !== null);
        const [answers, questions] = await Promise.all([
          getQuizAnswers(quizId),
          getQuestionsByIds(validQuestionIds),
        ]);

        const questionMap = new Map(questions.map((q) => [q.id, q]));
        const combined: QuestionResult[] = answers
          .map((answer) => {
            const question = questionMap.get(answer.questionId);
            if (!question) return null;
            return { question, answer };
          })
          .filter((r): r is QuestionResult => r !== null);

        setResults(combined);
      } catch (error) {
        console.error("Failed to load results:", error);
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [quiz?.questionIds, quizId]);

  // Redirect if quiz is not completed
  useEffect(() => {
    if (quiz && quiz.status !== "COMPLETED") {
      navigate(`/quiz/${quizId}`);
    }
  }, [quiz?.status, quizId, navigate]);

  if (loadingQuiz || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground">Quiz not found.</p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const score = quiz.score ?? 0;
  const total = quiz.totalQuestions ?? 0;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const correctCount = results.filter((r) => r.answer.isCorrect).length;
  const totalTime = results.reduce((acc, r) => acc + (r.answer.timeTaken ?? 0), 0);
  const avgTime = results.length > 0 ? Math.round(totalTime / results.length) : 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Summary Card */}
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>{quiz.questionSetName ?? "Quiz"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl font-bold text-primary">{percentage}%</div>
            <Progress value={percentage} className="w-full max-w-xs h-3" />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-center">
              <div className="min-w-[80px]">
                <p className="text-2xl font-bold text-green-500">{correctCount}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-12" />
              <div className="min-w-[80px]">
                <p className="text-2xl font-bold text-destructive">{total - correctCount}</p>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-12" />
              <div className="min-w-[80px]">
                <p className="text-2xl font-bold">{avgTime}s</p>
                <p className="text-sm text-muted-foreground">Avg Time</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Link to="/">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/quiz/new">
              <Button>
                <RotateCcw className="h-4 w-4 mr-2" />
                New Quiz
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Question Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Question Breakdown</CardTitle>
          <CardDescription>Review your answers</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]" type="always">
            <div className="space-y-6 pr-4">
              {results.map((result, index) => {
                const { question, answer } = result;
                const isCorrect = answer.isCorrect;
                const selectedIndex = answer.selectedIndex;
                const correctIndex = question.correctIndex;

                return (
                  <div
                    key={question.id}
                    className={cn(
                      "p-4 rounded-lg border",
                      isCorrect ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"
                    )}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">Q{index + 1}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {answer.timeTaken}s
                          </span>
                        </div>
                        <p className="font-medium">{question.text}</p>
                      </div>
                    </div>

                    <div className="ml-8 space-y-2">
                      {question.options?.map((option, optIndex) => {
                        const isUserAnswer = optIndex === selectedIndex;
                        const isCorrectAnswer = optIndex === correctIndex;

                        return (
                          <div
                            key={optIndex}
                            className={cn(
                              "px-3 py-2 rounded-md text-sm",
                              isCorrectAnswer && "bg-green-100 text-green-800 font-medium",
                              isUserAnswer && !isCorrect && "bg-red-100 text-red-800",
                              !isCorrectAnswer && !isUserAnswer && "bg-muted/50"
                            )}
                          >
                            <span className="mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                            {option}
                            {isCorrectAnswer && (
                              <Badge variant="success" className="ml-2">
                                Correct
                              </Badge>
                            )}
                            {isUserAnswer && !isCorrect && (
                              <Badge variant="destructive" className="ml-2">
                                Your Answer
                              </Badge>
                            )}
                            {isUserAnswer && isCorrect && (
                              <Badge variant="success" className="ml-2">
                                Your Answer
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                      {selectedIndex === null && (
                        <p className="text-sm text-muted-foreground italic">
                          No answer submitted (timeout)
                        </p>
                      )}
                    </div>

                    {question.explanation && (
                      <div className="ml-8 mt-3 p-3 bg-muted rounded-md">
                        <p className="text-sm">
                          <span className="font-medium">Explanation: </span>
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
