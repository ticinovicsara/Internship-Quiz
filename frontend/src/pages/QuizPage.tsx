import { useParams } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" gutterBottom>
        Quiz {quizId}
      </Typography>
      <Typography>Quiz questions go here...</Typography>
    </Container>
  );
}
