import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Box, Card } from "@mui/material";
import { useQuiz } from "../hooks/useQuiz";
import { QuestionComponent } from "../components/QuestionComponent";
import { Navigation } from "../components/Navigation";
import { QuestionHeader } from "../components/QuestionHeader";
import { calculateScore } from "../utils/calculate/calculateScore";
import { ScoreSection } from "../components/ScoreSection";
import paths from "../utils/paths";
import { getUsernameFromToken } from "../utils/getUsername";

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

  const username = getUsernameFromToken();

  const startQuiz = () => {
    setScore(0);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowImage(false);
    setQuizStarted(true);
    setQuizFinished(false);
  };

  const handleAnswerChange = (
    questionId: number,
    answer: { [key: string]: any }
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

  const finishQuiz = () => {
    const totalScore = quiz ? calculateScore(quiz.questions, userAnswers) : 0;
    setScore(totalScore);
    setQuizStarted(false);
    setQuizFinished(true);
    setUsers(users);
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
  const userRank = sortedUsers.findIndex((user) => user.score === score) + 1;

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

      <Button
        variant="contained"
        color="primary"
        onClick={quizFinished ? () => goToHome : startQuiz}
        style={{ marginTop: "20px" }}
      >
        {quizFinished ? "Go to Home" : "Start Quiz"}
      </Button>

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

      {quizFinished && (
        <Box
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              backgroundColor: "#F8DE7E",
              width: "70vw",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ textDecoration: "underline", marginBottom: "10px" }}
            >
              Leaderboard
            </Typography>
            {sortedUsers.map((user, index) => (
              <Typography key={index}>
                {index + 1}. {username} - {user.score} points
              </Typography>
            ))}
          </Card>

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Your score: {score}
          </Typography>
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            Your Rank: {userRank}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
