import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { Navigation } from "../components/Navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CircularProgress, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useQuizzes } from "../hooks/useQuizzes";

export function QuizzesPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get("search") || "";
  const { quizzes, loading, error } = useQuizzes(searchQuery);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navigation />
      <Grid container spacing={3} padding={3}>
        {filteredQuizzes.map((quiz) => (
          <Grid key={quiz.id}>
            <Card onClick={() => navigate(`/quiz/${quiz.id}`)}>
              <CardMedia
                component="img"
                height="140"
                image={quiz.imageURL}
                alt={quiz.title}
              />
              <CardContent>
                <Typography variant="h6">{quiz.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
