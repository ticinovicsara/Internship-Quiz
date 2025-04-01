import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import {
  Typography,
  Container,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Box,
  CardContent,
  Card,
} from "@mui/material";
import { useQuiz } from "../hooks/useQuiz";
import { Question } from "../types/question";

export function QuizPage() {
  const { quizId } = useParams<{ quizId?: string }>();
  const { quiz, loading, error } = useQuiz(quizId ?? "");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [users, setUsers] = useState<{ username: string; score: number }[]>([]);

  const startQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const calculateScore = () => {
    if (!quiz) return;

    let totalScore = 0;
    quiz.questions.forEach((question: Question) => {
      if (userAnswers[question.id] === question.answer) {
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

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" gutterBottom>
        Quiz: {quiz.title}
      </Typography>

      {!quizStarted ? (
        <Button variant="contained" color="primary" onClick={startQuiz}>
          Start Quiz
        </Button>
      ) : (
        <Box style={{ justifyContent: "center" }}>
          <Card style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h6">
                {currentQuestion.questionText}
              </Typography>

              {currentQuestion.type === "multiple_choice" && (
                <FormControl component="fieldset">
                  <RadioGroup
                    value={userAnswers[currentQuestion.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion.id, e.target.value)
                    }
                  >
                    {currentQuestion.options?.map(
                      (option: any, index: number) => (
                        <FormControlLabel
                          key={index}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      )
                    )}
                  </RadioGroup>
                </FormControl>
              )}

              {currentQuestion.type === "fill_in_the_blank" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Your answer"
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.id, e.target.value)
                  }
                />
              )}

              {currentQuestion.type === "matching" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Your answer"
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.id, e.target.value)
                  }
                />
              )}

              {currentQuestion.type === "ordering" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Order your answers"
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.id, e.target.value)
                  }
                />
              )}

              {currentQuestion.type === "slider" && (
                <TextField
                  type="number"
                  variant="outlined"
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.id, e.target.value)
                  }
                  placeholder="Your answer"
                />
              )}
            </CardContent>
          </Card>

          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={goToNextQuestion}
            >
              Next Question
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={finishQuiz}>
              Finish Quiz
            </Button>
          )}

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Your score: {score}/{quiz.questions.length}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
