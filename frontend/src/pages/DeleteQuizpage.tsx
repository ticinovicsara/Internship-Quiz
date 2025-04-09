import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { fetchQuizzes } from "../services/fetchQuizzes";
import { Quiz } from "../types/quiz";
import { QuizList } from "../components/QuizList";
import { deleteQuiz } from "../services/deleteQuiz";
import { toast } from "react-toastify";
import { Navigation } from "../components/Navigation";

export const DeleteQuizPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuizzes();
      setQuizzes(data);
    };
    fetchData();
  }, []);

  const handleSelectQuiz = (id: string) => {
    setSelectedQuizzes((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((quizId) => quizId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteQuizzes = async () => {
    try {
      console.log("Brisanje kvizova sa ID-ovima: ", selectedQuizzes);

      for (const quizId of selectedQuizzes) {
        const response = await deleteQuiz(quizId);
        console.log(`Kviz sa ID-jem ${quizId} je uspešno obrisan.`, response);
      }

      toast.error("Quiz(zes) successfully deleted");

      const updatedQuizzes = await fetchQuizzes();
      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.error("Error deleting quizzes:", error);
    }
  };

  return (
    <>
      <Navigation />
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center  ",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Delete Quiz
        </Typography>

        <QuizList
          quizzes={quizzes}
          selectedQuizzes={selectedQuizzes}
          handleSelectQuiz={handleSelectQuiz}
        />

        <Button
          variant="contained"
          color="error"
          disabled={selectedQuizzes.length === 0}
          onClick={handleDeleteQuizzes}
          sx={{ mt: 2 }}
        >
          Delete Selected Quizzes
        </Button>
      </Box>
    </>
  );
};
