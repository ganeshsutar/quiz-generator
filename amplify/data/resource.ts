import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // Public question sets (read-only for users)
  QuestionSet: a
    .model({
      name: a.string().required(),
      description: a.string(),
      category: a.string().required(),
      difficulty: a.enum(["EASY", "MEDIUM", "HARD"]),
      isActive: a.boolean().default(true),
      questions: a.hasMany("Question", "questionSetId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["read"]),
    ]),

  // Individual questions
  Question: a
    .model({
      questionSetId: a.id().required(),
      questionSet: a.belongsTo("QuestionSet", "questionSetId"),
      text: a.string().required(),
      options: a.string().array().required(),
      correctIndex: a.integer().required(),
      explanation: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["read"]),
    ]),

  // User's quiz instance
  Quiz: a
    .model({
      questionSetId: a.id().required(),
      questionSetName: a.string(),
      status: a.enum(["IN_PROGRESS", "COMPLETED"]),
      totalQuestions: a.integer().required(),
      timePerQuestion: a.integer().required(),
      currentQuestionIndex: a.integer().default(0),
      score: a.integer(),
      startedAt: a.datetime(),
      completedAt: a.datetime(),
      questionIds: a.string().array().required(),
      answers: a.hasMany("QuizAnswer", "quizId"),
    })
    .authorization((allow) => [allow.owner()]),

  // User's answer to a question
  QuizAnswer: a
    .model({
      quizId: a.id().required(),
      quiz: a.belongsTo("Quiz", "quizId"),
      questionId: a.id().required(),
      questionIndex: a.integer().required(),
      selectedIndex: a.integer(),
      isCorrect: a.boolean().required(),
      timeTaken: a.integer(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
