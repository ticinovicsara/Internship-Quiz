import { Routes, Route, useNavigate } from "react-router-dom";
import {
  QuizzesPage,
  QuizPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  AddQuizPage,
  DeleteQuizPage,
  AddCategoryPage,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import paths from "./utils/paths";
import { useEffect } from "react";
import { isAuthenticated } from "./utils/auth";
import AdminRoute from "./components/AdminRoute";
import UserScoresPage from "./pages/UserScoresPage";

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

      <Route element={<AdminRoute />}>
        <Route path={paths.ADD_QUIZ} element={<AddQuizPage />} />
        <Route path={paths.ADD_CATEGORY} element={<AddCategoryPage />} />
        <Route path={paths.DELETE_QUIZ} element={<DeleteQuizPage />} />
        <Route path={paths.USER_SCORES} element={<UserScoresPage />} />
      </Route>

      <Route path={paths.NOTFOUND} element={<NotFoundPage />} />
      <Route path={paths.OTHER} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
