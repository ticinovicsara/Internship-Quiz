import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  QuizzesPage,
  QuizPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<QuizzesPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
