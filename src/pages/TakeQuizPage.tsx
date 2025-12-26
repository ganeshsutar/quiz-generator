import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz as useQuizData } from "@/hooks/useQuizzes";
import {
  getQuestionsByIds,
  submitAnswer,
  completeQuiz,
  shuffleArray,
} from "@/hooks/useQuiz";
import { useTimer, formatTime } from "@/hooks/useTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Clock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Schema } from "../../amplify/data/resource";

type Question = Schema["Question"]["type"];
type ShuffledOption = { text: string; originalIndex: number };

// Convert all-caps or mostly-caps text to sentence case
function toSentenceCase(text: string): string {
  const letters = text.replace(/[^a-zA-Z]/g, '');
  const uppercaseCount = (text.match(/[A-Z]/g) || []).length;

  // Only convert if more than 50% of letters are uppercase
  if (letters.length > 0 && uppercaseCount / letters.length > 0.5) {
    return text.toLowerCase().replace(/^\s*\w/, (c) => c.toUpperCase());
  }
  return text;
}

export function TakeQuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { quiz, loading: loadingQuiz } = useQuizData(quizId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Map<number, ShuffledOption[]>>(new Map());
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [submitting, setSubmitting] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const currentQuestion = questions[currentIndex];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const timePerQuestion = quiz?.timePerQuestion ?? 60;
  const totalTime = timePerQuestion * (questions.length || 1);

  const { timeRemaining, restart } = useTimer({
    duration: totalTime,
    onExpire: () => {},
    autoStart: false,
  });

  const timerExpiredRef = useRef(false);

  // Load questions when quiz is available
  useEffect(() => {
    async function loadQuestions() {
      if (!quiz?.questionIds) return;

      setLoadingQuestions(true);
      try {
        const validQuestionIds = quiz.questionIds.filter((id): id is string => id !== null);
        const fetchedQuestions = await getQuestionsByIds(validQuestionIds);
        const orderedQuestions = quiz.questionIds
          .map((id) => fetchedQuestions.find((q) => q.id === id))
          .filter((q): q is Question => q !== undefined);
        setQuestions(orderedQuestions);
        setCurrentIndex(quiz.currentQuestionIndex ?? 0);

        // Create shuffled options for each question
        const shuffledMap = new Map<number, ShuffledOption[]>();
        orderedQuestions.forEach((question, qIndex) => {
          if (question.options) {
            const optionsWithIndex: ShuffledOption[] = question.options
              .filter((opt): opt is string => opt !== null)
              .map((text, originalIndex) => ({ text, originalIndex }));
            shuffledMap.set(qIndex, shuffleArray(optionsWithIndex));
          }
        });
        setShuffledOptionsMap(shuffledMap);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoadingQuestions(false);
      }
    }

    loadQuestions();
  }, [quiz?.questionIds, quiz?.currentQuestionIndex]);

  // Start overall timer once questions are loaded
  useEffect(() => {
    if (questions.length > 0 && !loadingQuestions && !timerStarted) {
      const totalQuizTime = timePerQuestion * questions.length;
      restart(totalQuizTime);
      startTimeRef.current = Date.now();
      setTimerStarted(true);
    }
  }, [questions.length, loadingQuestions, timePerQuestion, timerStarted, restart]);

  // Redirect if quiz is completed
  useEffect(() => {
    if (quiz?.status === "COMPLETED") {
      navigate(`/quiz/${quizId}/results`);
    }
  }, [quiz?.status, quizId, navigate]);

  const handleSelectAnswer = (optionIndex: number) => {
    setAnswers(prev => new Map(prev).set(currentIndex, optionIndex));
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleFinishQuiz = useCallback(async () => {
    if (!quiz || submitting) return;

    setSubmitting(true);
    const totalTimeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const avgTimePerQuestion = Math.floor(totalTimeTaken / questions.length);

    try {
      let correctCount = 0;

      // Submit all answers
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const selectedIndex = answers.get(i) ?? null;
        const isCorrect = selectedIndex !== null && selectedIndex === question.correctIndex;

        if (isCorrect) correctCount++;

        await submitAnswer({
          quizId: quiz.id,
          questionId: question.id,
          questionIndex: i,
          selectedIndex,
          isCorrect,
          timeTaken: avgTimePerQuestion,
        });
      }

      await completeQuiz(quiz.id, correctCount);
      navigate(`/quiz/${quiz.id}/results`);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      setSubmitting(false);
    }
  }, [quiz, submitting, questions, answers, navigate]);

  // Handle timer expiration
  useEffect(() => {
    if (timeRemaining === 0 && !timerExpiredRef.current && questions.length > 0) {
      timerExpiredRef.current = true;
      handleFinishQuiz();
    }
  }, [timeRemaining, questions.length, handleFinishQuiz]);

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

  const answeredCount = answers.size;
  const progressPercent = (answeredCount / questions.length) * 100;
  const timerPercent = (timeRemaining / totalTime) * 100;
  const isTimerWarning = timeRemaining <= 60;
  const selectedAnswer = answers.get(currentIndex);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header with progress and timer */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-lg sm:text-xl font-bold">{quiz.questionSetName ?? "Quiz"}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-mono text-base sm:text-lg font-bold self-start sm:self-auto",
              isTimerWarning
                ? "bg-destructive/10 text-destructive animate-pulse"
                : "bg-muted"
            )}
          >
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Answered</span>
            <span>{answeredCount} / {questions.length}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Time Remaining</span>
            <span>{formatTime(timeRemaining)}</span>
          </div>
          <Progress
            value={timerPercent}
            className={cn(
              "h-2",
              isTimerWarning && "[&>*]:bg-destructive"
            )}
          />
        </div>

        {/* Question Navigator */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-md text-xs sm:text-sm font-medium transition-colors",
                idx === currentIndex
                  ? "bg-primary text-primary-foreground"
                  : answers.has(idx)
                  ? "bg-green-500 text-white"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {idx + 1}
            </button>
          ))}
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
            value={selectedAnswer?.toString() ?? ""}
            onValueChange={(value) => handleSelectAnswer(parseInt(value, 10))}
            className="space-y-3"
          >
            {shuffledOptionsMap.get(currentIndex)?.map((option, displayIndex) => (
              <div
                key={displayIndex}
                className={cn(
                  "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors",
                  selectedAnswer === option.originalIndex
                    ? "border-primary bg-primary/5"
                    : "hover:bg-accent"
                )}
                onClick={() => handleSelectAnswer(option.originalIndex)}
              >
                <RadioGroupItem
                  value={option.originalIndex.toString()}
                  id={`option-${displayIndex}`}
                />
                <Label
                  htmlFor={`option-${displayIndex}`}
                  className="flex-1 cursor-pointer"
                >
                  {toSentenceCase(option.text)}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={handleFinishQuiz}
                disabled={submitting}
                size="lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Finish Quiz"
                )}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status indicator */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {answeredCount} of {questions.length} questions answered
      </div>
    </div>
  );
}
