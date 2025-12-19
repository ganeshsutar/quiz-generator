# Quiz Application Implementation Plan

## Overview
Build a quiz application where authenticated users can take timed multiple-choice quizzes, track their progress, and view detailed results.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + shadcn/ui + Tailwind CSS
- **Backend**: AWS Amplify Gen 2 (DynamoDB + AppSync GraphQL)
- **Auth**: Amazon Cognito (email login)
- **Routing**: react-router-dom

---

## Phase 1: Project Configuration

### 1.1 Install Dependencies
```bash
# Tailwind & shadcn/ui
npm install tailwindcss postcss autoprefixer -D
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-radio-group
npm install @radix-ui/react-progress @radix-ui/react-select @radix-ui/react-separator
npm install @radix-ui/react-scroll-area

# Routing
npm install react-router-dom
```

### 1.2 Configuration Files to Create/Modify
| File | Action |
|------|--------|
| `tailwind.config.js` | Create - Tailwind config with shadcn theme |
| `postcss.config.js` | Create - PostCSS config |
| `src/index.css` | Replace - Tailwind directives + CSS variables |
| `tsconfig.json` | Modify - Add `@/` path alias |
| `vite.config.ts` | Modify - Add path alias resolution |
| `src/lib/utils.ts` | Create - shadcn `cn()` utility |
| `components.json` | Create - shadcn configuration |

---

## Phase 2: Data Model Schema

### File: `amplify/data/resource.ts`

```typescript
const schema = a.schema({
  // Public question sets (read-only for users)
  QuestionSet: a.model({
    name: a.string().required(),
    description: a.string(),
    category: a.string().required(),
    difficulty: a.enum(["EASY", "MEDIUM", "HARD"]),
    isActive: a.boolean().default(true),
    questions: a.hasMany("Question", "questionSetId"),
  }).authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    allow.authenticated().to(["read"]),
  ]),

  // Individual questions
  Question: a.model({
    questionSetId: a.id().required(),
    questionSet: a.belongsTo("QuestionSet", "questionSetId"),
    text: a.string().required(),
    options: a.string().array().required(),  // 4 options
    correctIndex: a.integer().required(),     // 0-3
    explanation: a.string(),
  }).authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    allow.authenticated().to(["read"]),
  ]),

  // User's quiz instance
  Quiz: a.model({
    questionSetId: a.id().required(),
    status: a.enum(["IN_PROGRESS", "COMPLETED"]),
    totalQuestions: a.integer().required(),
    timePerQuestion: a.integer().required(),  // seconds
    currentQuestionIndex: a.integer().default(0),
    score: a.integer(),
    startedAt: a.datetime(),
    completedAt: a.datetime(),
    questionIds: a.string().array().required(),  // selected question IDs
    answers: a.hasMany("QuizAnswer", "quizId"),
  }).authorization((allow) => [allow.owner()]),

  // User's answer to a question
  QuizAnswer: a.model({
    quizId: a.id().required(),
    quiz: a.belongsTo("Quiz", "quizId"),
    questionId: a.id().required(),
    selectedIndex: a.integer(),  // null if timeout
    isCorrect: a.boolean().required(),
    timeTaken: a.integer(),  // seconds
  }).authorization((allow) => [allow.owner()]),
});
```

Update `authorizationModes.defaultAuthorizationMode` to `"userPool"`.

---

## Phase 3: File Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   └── badge.tsx
│   ├── layout/
│   │   ├── AppLayout.tsx      # Main layout with sidebar
│   │   ├── Sidebar.tsx        # Quiz list sidebar
│   │   └── Header.tsx         # User info header
│   ├── auth/
│   │   └── AuthWrapper.tsx    # Amplify Authenticator
│   └── quiz/
│       ├── QuizConfig.tsx     # Quiz settings form
│       ├── QuizQuestion.tsx   # Question display
│       ├── QuizTimer.tsx      # Countdown timer
│       └── QuizResults.tsx    # Results breakdown
├── pages/
│   ├── HomePage.tsx           # Dashboard
│   ├── CreateQuizPage.tsx     # Quiz creation
│   ├── TakeQuizPage.tsx       # Quiz taking
│   └── ResultsPage.tsx        # Results view
├── hooks/
│   ├── useQuiz.ts             # Quiz CRUD operations
│   ├── useQuizzes.ts          # List user quizzes
│   ├── useQuestionSets.ts     # Fetch question sets
│   └── useTimer.ts            # Countdown hook
├── lib/
│   ├── utils.ts               # shadcn utilities
│   └── amplify-client.ts      # Typed Amplify client
└── App.tsx                    # Router setup
```

---

## Phase 4: Core Features Implementation

### 4.1 Layout Structure
```
+------------------+------------------------+
|     SIDEBAR      |      MAIN CONTENT      |
|------------------|                        |
| [+ New Quiz]     |   (Route content)      |
|------------------|                        |
| Running Tests    |                        |
|  • Quiz 1 →      |                        |
|------------------|                        |
| Completed Tests  |                        |
|  • Quiz 2 (view) |                        |
+------------------+------------------------+
```

### 4.2 Quiz Creation Flow
1. Show available QuestionSets grouped by category
2. User selects a set
3. User configures: number of questions, time per question (30s/60s/90s)
4. On submit: randomly select N questions, create Quiz, navigate to take quiz

### 4.3 Quiz Taking
- Display one question at a time with radio button options
- Countdown timer per question (auto-submit on expire)
- Progress bar showing question X of Y
- Save each answer to QuizAnswer, update Quiz.currentQuestionIndex
- On completion: calculate score, update Quiz status, redirect to results

### 4.4 Results Page
- Overall score: X/Y (percentage)
- Question-by-question breakdown:
  - Question text
  - User's answer (red if wrong)
  - Correct answer (green)
  - Explanation if available

### 4.5 Sidebar
- "New Quiz" button at top
- "Running" section: IN_PROGRESS quizzes (clickable to resume)
- "Completed" section: COMPLETED quizzes (clickable to view results)
- Real-time updates via Amplify subscriptions

---

## Phase 5: Routing

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/quiz/new" element={<CreateQuizPage />} />
  <Route path="/quiz/:quizId" element={<TakeQuizPage />} />
  <Route path="/quiz/:quizId/results" element={<ResultsPage />} />
</Routes>
```

---

## Phase 6: Seed Data

Create `scripts/seed-questions.ts` with 5 question sets:
1. JavaScript Fundamentals (Easy) - 20 questions
2. React Concepts (Medium) - 20 questions
3. TypeScript Basics (Easy) - 20 questions
4. AWS Services (Medium) - 15 questions
5. General Programming (Easy) - 25 questions

Run after deployment: `npx tsx scripts/seed-questions.ts`

---

## Implementation Order

1. **Setup**: Install deps, configure Tailwind/shadcn, path aliases
2. **Data**: Update Amplify schema, deploy sandbox
3. **Auth**: Add AuthWrapper with Amplify Authenticator
4. **Layout**: Create AppLayout, Sidebar, Header
5. **Routing**: Set up react-router-dom routes
6. **Pages**: Implement HomePage, CreateQuizPage, TakeQuizPage, ResultsPage
7. **Hooks**: Create useTimer, useQuiz, useQuizzes, useQuestionSets
8. **Seed**: Create and run seed script
9. **Polish**: Loading states, error handling, responsive design

---

## Critical Files to Modify

| File | Purpose |
|------|---------|
| `amplify/data/resource.ts` | Data models |
| `vite.config.ts` | Path aliases |
| `tsconfig.json` | TypeScript paths |
| `src/index.css` | Tailwind styles |
| `src/App.tsx` | Router + layout |
| `src/main.tsx` | Entry point |
