import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { CreateQuizPage } from "@/pages/CreateQuizPage";
import { TakeQuizPage } from "@/pages/TakeQuizPage";
import { ResultsPage } from "@/pages/ResultsPage";

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz/new" element={<CreateQuizPage />} />
            <Route path="/quiz/:quizId" element={<TakeQuizPage />} />
            <Route path="/quiz/:quizId/results" element={<ResultsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
