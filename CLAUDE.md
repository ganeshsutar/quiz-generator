# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript compile + Vite build
npm run lint         # ESLint with zero warnings allowed
npm run preview      # Preview production build
npx ampx sandbox     # Start Amplify sandbox (deploys backend)
npx tsx scripts/seed-questions.ts --all  # Seed database with question sets
```

## Architecture

This is a quiz application built with React + Vite frontend and AWS Amplify Gen 2 backend.

### Frontend Stack
- React 18 + TypeScript + Vite
- Tailwind CSS with shadcn/ui components (Radix UI primitives)
- react-router-dom for routing
- Path alias: `@/*` maps to `./src/*`

### Backend (AWS Amplify Gen 2)
- **Auth**: Amazon Cognito (email login), configured in `amplify/auth/resource.ts`
- **Data**: AppSync GraphQL + DynamoDB, schema in `amplify/data/resource.ts`
- **Client**: Typed client generated from schema, exported from `src/lib/amplify-client.ts`

### Data Models
Four models defined in `amplify/data/resource.ts`:
- **QuestionSet**: Categories of questions (public read, admin write via API key)
- **Question**: Individual MCQ questions belonging to a QuestionSet
- **Quiz**: User's quiz instance with owner-based auth
- **QuizAnswer**: User's answers to quiz questions with owner-based auth

### Key Application Flow
1. User authenticates via Cognito (AuthWrapper component)
2. Creates quiz by selecting a QuestionSet and configuring options
3. Takes quiz with timed questions (useTimer hook manages countdown)
4. Results stored in Quiz/QuizAnswer models, displayed on results page

### Routes
- `/` - Home/Dashboard
- `/quiz/new` - Create new quiz
- `/quiz/:quizId` - Take a quiz
- `/quiz/:quizId/results` - View quiz results

### File Organization
- `src/components/ui/` - shadcn/ui components
- `src/components/layout/` - AppLayout, Sidebar, Header
- `src/components/auth/` - AuthWrapper (Amplify Authenticator)
- `src/pages/` - Route page components
- `src/hooks/` - useQuiz, useQuizzes, useQuestionSets, useTimer
- `amplify/` - Backend configuration (auth, data schema)
- `scripts/` - Database seeding scripts
