import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz as useQuizData } from "@/hooks/useQuizzes";
import {
  getQuestionsByIds,
  submitAnswer,
  updateQuizProgress,
  completeQuiz,
} from "@/hooks/useQuiz";
import { useTimer, formatTime } from "@/hooks/useTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Schema } from "../../amplify/data/resource";

type Question = Schema["Question"]["type"];

export function TakeQuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { quiz, loading: loadingQuiz } = useQuizData(quizId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const timePerQuestion = quiz?.timePerQuestion ?? 60;

  const handleTimeExpire = useCallback(() => {
    if (!submitting && currentQuestion) {
      handleSubmit(true);
    }
  }, [submitting, currentQuestion]);

  const { timeRemaining, restart } = useTimer({
    duration: timePerQuestion,
    onExpire: handleTimeExpire,
    autoStart: false,
  });

  // Load questions when quiz is available
  useEffect(() => {
    async function loadQuestions() {
      if (!quiz?.questionIds) return;

      setLoadingQuestions(true);
      try {
        const validQuestionIds = quiz.questionIds.filter((id): id is string => id !== null);
        const fetchedQuestions = await getQuestionsByIds(validQuestionIds);
        // Sort by the order in questionIds
        const orderedQuestions = quiz.questionIds
          .map((id) => fetchedQuestions.find((q) => q.id === id))
          .filter((q): q is Question => q !== undefined);
        setQuestions(orderedQuestions);
        setCurrentIndex(quiz.currentQuestionIndex ?? 0);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoadingQuestions(false);
      }
    }

    loadQuestions();
  }, [quiz?.questionIds, quiz?.currentQuestionIndex]);

  // Start timer when current question changes
  useEffect(() => {
    if (questions.length > 0 && !loadingQuestions) {
      restart(timePerQuestion);
      setSelectedAnswer(null);
    }
  }, [currentIndex, questions.length, loadingQuestions, timePerQuestion]);

  // Redirect if quiz is completed
  useEffect(() => {
    if (quiz?.status === "COMPLETED") {
      navigate(`/quiz/${quizId}/results`);
    }
  }, [quiz?.status, quizId, navigate]);

  const handleSubmit = async (timeout = false) => {
    if (!quiz || !currentQuestion || submitting) return;

    setSubmitting(true);
    const answerIndex = timeout ? null : parseInt(selectedAnswer ?? "-1", 10);
    const isCorrect =
      answerIndex !== null && answerIndex === currentQuestion.correctIndex;
    const timeTaken = timePerQuestion - timeRemaining;

    try {
      await submitAnswer({
        quizId: quiz.id,
        questionId: currentQuestion.id,
        questionIndex: currentIndex,
        selectedIndex: answerIndex === -1 ? null : answerIndex,
        isCorrect,
        timeTaken,
      });

      const newScore = score + (isCorrect ? 1 : 0);
      setScore(newScore);

      if (isLastQuestion) {
        await completeQuiz(quiz.id, newScore);
        navigate(`/quiz/${quiz.id}/results`);
      } else {
        const nextIndex = currentIndex + 1;
        await updateQuizProgress(quiz.id, nextIndex);
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingQuiz || loadingQuestions) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">Quiz not found or has no questions.</p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const timerPercent = (timeRemaining / timePerQuestion) * 100;
  const isTimerWarning = timeRemaining <= 10;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header with progress and timer */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{quiz.questionSetName ?? "Quiz"}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold",
              isTimerWarning
                ? "bg-destructive/10 text-destructive animate-pulse"
                : "bg-muted"
            )}
          >
            <Clock className="h-5 w-5" />
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Time</span>
            <span>{timeRemaining}s</span>
          </div>
          <Progress
            value={timerPercent}
            className={cn(
              "h-2",
              isTimerWarning && "[&>*]:bg-destructive"
            )}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion?.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer ?? ""}
            onValueChange={setSelectedAnswer}
            className="space-y-3"
          >
            {currentQuestion?.options?.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors",
                  selectedAnswer === index.toString()
                    ? "border-primary bg-primary/5"
                    : "hover:bg-accent"
                )}
                onClick={() => setSelectedAnswer(index.toString())}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => handleSubmit(false)}
              disabled={selectedAnswer === null || submitting}
              size="lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : isLastQuestion ? (
                "Finish Quiz"
              ) : (
                "Next Question"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Score indicator */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Current Score: {score} / {currentIndex}
      </div>
    </div>
  );
}
