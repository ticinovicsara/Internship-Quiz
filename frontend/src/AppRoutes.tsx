import { Routes, Route, useNavigate } from "react-router-dom";
import {
  QuizzesPage,
  QuizPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import paths from "./utils/paths";
import { useEffect } from "react";
import { isAuthenticated } from "./utils/auth";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && !isAuthenticated()) {
      navigate(paths.LOGIN, { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path={paths.LOGIN} element={<LoginPage />} />
      <Route path={paths.REGISTER} element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={paths.QUIZZES} element={<QuizzesPage />} />
        <Route path={paths.QUIZ(":quizId")} element={<QuizPage />} />
      </Route>

      <Route path={paths.NOTFOUND} element={<NotFoundPage />} />
      <Route path={paths.OTHER} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
