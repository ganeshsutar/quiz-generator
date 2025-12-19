import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionSets, useQuestionsBySet } from "@/hooks/useQuestionSets";
import { createQuiz, shuffleArray } from "@/hooks/useQuiz";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Play, BookOpen } from "lucide-react";

const TIME_OPTIONS = [
  { value: "30", label: "30 seconds" },
  { value: "60", label: "1 minute" },
  { value: "90", label: "1.5 minutes" },
  { value: "120", label: "2 minutes" },
];

export function CreateQuizPage() {
  const navigate = useNavigate();
  const { questionSets, loading: loadingSets } = useQuestionSets();
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [numQuestions, setNumQuestions] = useState<string>("5");
  const [timePerQuestion, setTimePerQuestion] = useState<string>("60");
  const [creating, setCreating] = useState(false);

  const { questions, loading: loadingQuestions } = useQuestionsBySet(selectedSetId);
  const selectedSet = questionSets.find((s) => s.id === selectedSetId);

  const maxQuestions = questions.length;
  const questionOptions = Array.from(
    { length: Math.min(maxQuestions, 20) },
    (_, i) => i + 1
  ).filter((n) => n <= maxQuestions);

  const handleStartQuiz = async () => {
    if (!selectedSetId || !selectedSet) return;

    setCreating(true);
    try {
      const count = parseInt(numQuestions, 10);
      const shuffled = shuffleArray(questions);
      const selectedQuestions = shuffled.slice(0, count);
      const questionIds = selectedQuestions.map((q) => q.id);

      const quiz = await createQuiz({
        questionSetId: selectedSetId,
        questionSetName: selectedSet.name,
        questionIds,
        totalQuestions: count,
        timePerQuestion: parseInt(timePerQuestion, 10),
      });

      navigate(`/quiz/${quiz.id}`);
    } catch (error) {
      console.error("Failed to create quiz:", error);
      setCreating(false);
    }
  };

  if (loadingSets) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Quiz</h1>
        <p className="text-muted-foreground">
          Select a question set and configure your quiz settings
        </p>
      </div>

      {questionSets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Question Sets Available</h3>
            <p className="text-muted-foreground">
              Question sets need to be added before you can create a quiz.
              <br />
              Run the seed script to add sample questions.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Question Set Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Question Set</CardTitle>
              <CardDescription>
                Choose a topic to be quizzed on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {questionSets.map((set) => (
                  <button
                    key={set.id}
                    onClick={() => {
                      setSelectedSetId(set.id);
                      setNumQuestions("5");
                    }}
                    className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-colors ${
                      selectedSetId === set.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{set.name}</h3>
                        <Badge
                          variant={
                            set.difficulty === "EASY"
                              ? "success"
                              : set.difficulty === "MEDIUM"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {set.difficulty}
                        </Badge>
                      </div>
                      {set.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {set.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Category: {set.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quiz Configuration */}
          {selectedSetId && (
            <Card>
              <CardHeader>
                <CardTitle>Quiz Settings</CardTitle>
                <CardDescription>
                  Configure the number of questions and time limit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingQuestions ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading questions...
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Number of Questions</Label>
                        <Select
                          value={numQuestions}
                          onValueChange={setNumQuestions}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {questionOptions.map((n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n} questions
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          {maxQuestions} questions available
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Time per Question</Label>
                        <Select
                          value={timePerQuestion}
                          onValueChange={setTimePerQuestion}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={handleStartQuiz}
                        disabled={creating || maxQuestions === 0}
                        className="w-full"
                      >
                        {creating ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating Quiz...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Quiz
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
