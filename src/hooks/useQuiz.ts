import { client } from "@/lib/amplify-client";
import type { Schema } from "../../amplify/data/resource";

type Quiz = Schema["Quiz"]["type"];
type QuizAnswer = Schema["QuizAnswer"]["type"];
type Question = Schema["Question"]["type"];

interface CreateQuizParams {
  questionSetId: string;
  questionSetName: string;
  questionIds: string[];
  totalQuestions: number;
  timePerQuestion: number;
}

export async function createQuiz(params: CreateQuizParams): Promise<Quiz> {
  const { data, errors } = await client.models.Quiz.create({
    questionSetId: params.questionSetId,
    questionSetName: params.questionSetName,
    questionIds: params.questionIds,
    totalQuestions: params.totalQuestions,
    timePerQuestion: params.timePerQuestion,
    status: "IN_PROGRESS",
    currentQuestionIndex: 0,
    startedAt: new Date().toISOString(),
  });

  if (errors || !data) {
    throw new Error(errors?.[0]?.message ?? "Failed to create quiz");
  }

  return data;
}

interface SubmitAnswerParams {
  quizId: string;
  questionId: string;
  questionIndex: number;
  selectedIndex: number | null;
  isCorrect: boolean;
  timeTaken: number;
}

export async function submitAnswer(params: SubmitAnswerParams): Promise<QuizAnswer> {
  const { data, errors } = await client.models.QuizAnswer.create({
    quizId: params.quizId,
    questionId: params.questionId,
    questionIndex: params.questionIndex,
    selectedIndex: params.selectedIndex,
    isCorrect: params.isCorrect,
    timeTaken: params.timeTaken,
  });

  if (errors || !data) {
    throw new Error(errors?.[0]?.message ?? "Failed to submit answer");
  }

  return data;
}

export async function updateQuizProgress(
  quizId: string,
  currentQuestionIndex: number
): Promise<Quiz> {
  const { data, errors } = await client.models.Quiz.update({
    id: quizId,
    currentQuestionIndex,
  });

  if (errors || !data) {
    throw new Error(errors?.[0]?.message ?? "Failed to update quiz progress");
  }

  return data;
}

export async function completeQuiz(quizId: string, score: number): Promise<Quiz> {
  const { data, errors } = await client.models.Quiz.update({
    id: quizId,
    status: "COMPLETED",
    score,
    completedAt: new Date().toISOString(),
  });

  if (errors || !data) {
    throw new Error(errors?.[0]?.message ?? "Failed to complete quiz");
  }

  return data;
}

export async function getQuizAnswers(quizId: string): Promise<QuizAnswer[]> {
  const allAnswers: QuizAnswer[] = [];
  let nextToken: string | null | undefined = undefined;

  do {
    const { data, errors, nextToken: newNextToken }: { data: QuizAnswer[]; errors?: { message: string }[]; nextToken?: string | null } = await client.models.QuizAnswer.list({
      filter: { quizId: { eq: quizId } },
      limit: 100,
      nextToken,
    });

    if (errors) {
      throw new Error(errors[0].message);
    }

    allAnswers.push(...data);
    nextToken = newNextToken;
  } while (nextToken);

  return allAnswers.sort((a, b) => (a.questionIndex ?? 0) - (b.questionIndex ?? 0));
}

export async function getQuestionsByIds(questionIds: string[]): Promise<Question[]> {
  const questions: Question[] = [];

  for (const id of questionIds) {
    const { data, errors } = await client.models.Question.get({ id });
    if (errors) {
      console.error(`Failed to fetch question ${id}:`, errors);
      continue;
    }
    if (data) {
      questions.push(data);
    }
  }

  return questions;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
