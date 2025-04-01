import { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useQuiz } from "../hooks/useQuiz";
import { Question } from "../types/question";
import { QuestionComponent } from "../components/QuestionComponent";
import { ScoreSection } from "../components/ScoreSection";
import { Navigation } from "../components/Navigation";
import { QuestionHeader } from "../components/QuestionHeader";

export function QuizPage() {
  const { quizId } = useParams<{ quizId?: string }>();
  const { quiz, loading, error } = useQuiz(quizId ?? "");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [users, setUsers] = useState<{ username: string; score: number }[]>([]);
  const [showImage, setShowImage] = useState(true);

  const startQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowImage(false);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const calculateScore = () => {
    if (!quiz) return;

    let totalScore = 0;
    quiz.questions.forEach((question: Question) => {
      const correctAnswers: string[] =
        typeof question.answer === "string" ? JSON.parse(question.answer) : [];

      if (
        userAnswers[question.id] &&
        correctAnswers.includes(userAnswers[question.id])
      ) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  const finishQuiz = () => {
    calculateScore();
    setQuizStarted(false);
    setUsers([...users, { username: "User1", score }]);
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

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
  const options = currentQuestion.options || [];
  const correctAnswers = currentQuestion.answer
    ? JSON.parse(currentQuestion.answer)
    : [];

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
      {quizStarted && currentQuestion ? (
        <Button variant="contained" color="primary" onClick={startQuiz}>
          Start Quiz
        </Button>
      ) : (
        <QuestionComponent
          question={{
            ...currentQuestion,
            options: options,
            answer: correctAnswers,
          }}
          userAnswer={userAnswers[currentQuestion.id] || ""}
          onAnswerChange={handleAnswerChange}
        />
      )}

      {quizStarted && (
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
    </Box>
  );
}
