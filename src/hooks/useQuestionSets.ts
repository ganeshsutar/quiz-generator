import { useState, useEffect } from "react";
import { client } from "@/lib/amplify-client";
import type { Schema } from "../../amplify/data/resource";

type QuestionSet = Schema["QuestionSet"]["type"];
type Question = Schema["Question"]["type"];

export function useQuestionSets() {
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchQuestionSets() {
      try {
        const { data, errors } = await client.models.QuestionSet.list({
          filter: { isActive: { eq: true } },
        });
        if (errors) {
          throw new Error(errors[0].message);
        }
        setQuestionSets(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch question sets"));
      } finally {
        setLoading(false);
      }
    }

    fetchQuestionSets();
  }, []);

  return { questionSets, loading, error };
}

export function useQuestionsBySet(questionSetId: string | null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!questionSetId) {
      setQuestions([]);
      return;
    }

    async function fetchQuestions() {
      if (!questionSetId) return;
      setLoading(true);
      try {
        const { data, errors } = await client.models.Question.list({
          filter: { questionSetId: { eq: questionSetId } },
        });
        if (errors) {
          throw new Error(errors[0].message);
        }
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch questions"));
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [questionSetId]);

  return { questions, loading, error };
}
