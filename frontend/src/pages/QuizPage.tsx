import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useQuiz } from "../hooks/useQuiz";
import { QuestionComponent } from "../components/QuestionComponent";
import { Navigation } from "../components/Navigation";
import { QuestionHeader } from "../components/QuestionHeader";
import { calculateScore } from "../utils/calculate/calculateScore";
import { ScoreSection } from "../components/ScoreSection";
import paths from "../utils/paths";
import Leaderboard from "../components/Leaderboard";
import { getUsernameFromToken } from "../utils/getUsername";
import { postUserResults } from "../services/postUserResults";
import { fetchUserScoresByQuiz } from "../services/fetchUserScoresByQuiz";

export function QuizPage() {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId?: string }>();
  const { quiz, loading, error } = useQuiz(quizId ?? "");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: { [key: string]: string };
  }>({});
  const [score, setScore] = useState(0);
  const [users, setUsers] = useState<{ username: string; score: number }[]>([]);
  const [showImage, setShowImage] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = () => {
    setScore(0);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowImage(false);
    setQuizStarted(true);
  };

  const handleAnswerChange = (
    questionId: number,
    answer: { [key: string]: any; questionType?: String }
  ) => {
    setUserAnswers((prevState) => ({
      ...prevState,
      [questionId]: answer,
    }));
  };

  const handleAnswerSelection = (questionId: number, selectedValue: string) => {
    const updatedAnswer = {
      ...userAnswers[questionId],
      answer: selectedValue,
    };

    handleAnswerChange(questionId, updatedAnswer);
  };

  const finishQuiz = async () => {
    const totalScore = quiz ? calculateScore(quiz.questions, userAnswers) : 0;
    setScore(totalScore);
    setQuizStarted(false);
    setQuizFinished(true);
    setUsers(users);

    if (quizId && totalScore > 0) {
      try {
        const username = getUsernameFromToken();
        if (username) {
          await postUserResults(quizId, username, totalScore);
        } else {
          console.error("Username is null. Cannot post user results.");
        }
        const leaderboard = await fetchUserScoresByQuiz(quizId);
        setUsers(leaderboard);
      } catch (error) {
        console.error("Error finishing quiz:", error);
      }
    }
  };

  const goToNextQuestion = () => {
    const updatedScore = calculateScore(quiz?.questions ?? [], userAnswers);
    setScore(updatedScore);

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const goToHome = () => {
    navigate(paths.QUIZZES);
  };

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  if (loading) {
    return <Typography>Loading quiz...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <Typography color="error">No questions found for this quiz.</Typography>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navigation />
      <QuestionHeader
        title={quiz.title}
        imageURL={showImage ? quiz.imageURL : ""}
      />

      {!quizStarted && !quizFinished && (
        <Button
          variant="contained"
          color="primary"
          onClick={startQuiz}
          style={{
            marginTop: "20px",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Start Quiz
        </Button>
      )}

      {quizFinished && (
        <Button
          variant="contained"
          color="primary"
          onClick={goToHome}
          style={{
            marginTop: "20px",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Go to Home
        </Button>
      )}

      {quizStarted && !quizFinished && currentQuestion && (
        <QuestionComponent
          question={currentQuestion}
          userAnswer={userAnswers[currentQuestion.id] || {}}
          onAnswerChange={handleAnswerChange}
          onAnswerSelection={handleAnswerSelection}
        />
      )}

      {quizStarted && !quizFinished && (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={goToNextQuestion}
              >
                Next Question
              </Button>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                Current question: {currentQuestionIndex + 1} /{" "}
                {quiz.questions.length}
              </Typography>
            </>
          ) : (
            <Button variant="contained" color="secondary" onClick={finishQuiz}>
              Finish Quiz
            </Button>
          )}
          <ScoreSection score={score} totalQuestions={quiz.questions.length} />
        </Box>
      )}

      {quizFinished && <Leaderboard sortedUsers={sortedUsers} score={score} />}
    </Box>
  );
}
