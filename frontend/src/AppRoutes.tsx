import { Routes, Route } from "react-router-dom";
import {
  QuizzesPage,
  QuizPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import paths from "./paths";

const AppRoutes = () => {
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
