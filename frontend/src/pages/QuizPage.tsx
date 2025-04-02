import { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useQuiz } from "../hooks/useQuiz";
import { QuestionComponent } from "../components/QuestionComponent";
import { Navigation } from "../components/Navigation";
import { QuestionHeader } from "../components/QuestionHeader";
import { calculateScore } from "../utils/calculateScore";
import { ScoreSection } from "../components/ScoreSection";
export function QuizPage() {
  const { quizId } = useParams<{ quizId?: string }>();
  const { quiz, loading, error } = useQuiz(quizId ?? "");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: { [key: string]: string };
  }>({});
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
    setUsers([...users, { username: "User1", score: totalScore }]);
  };

  const goToNextQuestion = () => {
    const updatedScore = calculateScore(quiz?.questions ?? [], userAnswers);
    setScore(updatedScore);

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

      {!quizStarted && (
        <Button variant="contained" color="primary" onClick={startQuiz}>
          Start Quiz
        </Button>
      )}

      {quizStarted && currentQuestion && (
        <QuestionComponent
          question={currentQuestion}
          userAnswer={userAnswers[currentQuestion.id] || {}}
          onAnswerChange={handleAnswerChange}
          onAnswerSelection={handleAnswerSelection}
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
