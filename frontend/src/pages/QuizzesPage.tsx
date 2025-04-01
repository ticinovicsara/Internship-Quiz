import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { Navigation } from "../components/Navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

export function QuizzesPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get("search") || "";
  const [quizzes] = useState([
    { id: 1, name: "Math Quiz", category: "Math", image: "math.png" },
    { id: 2, name: "History Quiz", category: "History", image: "history.png" },
    { id: 3, name: "Science Quiz", category: "Science", image: "science.png" },
  ]);

  const filteredQuizzes = quizzes.filter((q) =>
    q.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                image={quiz.image}
                alt={quiz.name}
              />
              <CardContent>
                <Typography variant="h6">{quiz.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
