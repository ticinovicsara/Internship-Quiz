import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QuizzesPage, QuizPage, NotFoundPage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizzesPage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
