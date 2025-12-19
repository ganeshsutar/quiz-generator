import { useState, useEffect } from "react";
import { client } from "@/lib/amplify-client";
import type { Schema } from "../../amplify/data/resource";

type Quiz = Schema["Quiz"]["type"];

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = client.models.Quiz.observeQuery().subscribe({
      next: ({ items }) => {
        // Sort by createdAt descending
        const sorted = [...items].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setQuizzes(sorted);
        setLoading(false);
      },
      error: (err) => {
        setError(err instanceof Error ? err : new Error("Failed to fetch quizzes"));
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const runningQuizzes = quizzes.filter((q) => q.status === "IN_PROGRESS");
  const completedQuizzes = quizzes.filter((q) => q.status === "COMPLETED");

  return { quizzes, runningQuizzes, completedQuizzes, loading, error };
}

export function useQuiz(quizId: string | undefined) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!quizId) {
      setQuiz(null);
      setLoading(false);
      return;
    }

    async function fetchQuiz() {
      if (!quizId) return;
      try {
        const { data, errors } = await client.models.Quiz.get({ id: quizId });
        if (errors) {
          throw new Error(errors[0].message);
        }
        setQuiz(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch quiz"));
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId]);

  const refetch = async () => {
    if (!quizId) return;
    setLoading(true);
    try {
      const { data, errors } = await client.models.Quiz.get({ id: quizId });
      if (errors) {
        throw new Error(errors[0].message);
      }
      setQuiz(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch quiz"));
    } finally {
      setLoading(false);
    }
  };

  return { quiz, loading, error, refetch };
}
