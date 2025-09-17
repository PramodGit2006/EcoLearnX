import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "@/contexts/QuizContext";
import { ChallengeProvider } from "@/contexts/ChallengeContext";
import { UserProvider } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import QuizTaking from "./pages/QuizTaking";
import QuizManagement from "./pages/QuizManagement";
import Challenges from "./pages/Challenges";
import ChallengeManagement from "./pages/ChallengeManagement";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <QuizProvider>
          <ChallengeProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="quizzes" element={<Quizzes />} />
                  <Route path="quiz/:quizId" element={<QuizTaking />} />
                  <Route path="quiz-management" element={<QuizManagement />} />
                  <Route path="challenges" element={<Challenges />} />
                  <Route path="challenge-management" element={<ChallengeManagement />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="about" element={<About />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ChallengeProvider>
        </QuizProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
