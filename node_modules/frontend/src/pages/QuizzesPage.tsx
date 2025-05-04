import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { Navigation } from "../components/Navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useQuizzes } from "../hooks/useQuizzes";
import { Quiz } from "../types/quiz";

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

  const filteredQuizzes = quizzes.filter((q: Quiz) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navigation />
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginTop: "30px",
          justifyContent: "center",
        }}
      >
        {filteredQuizzes.map((quiz: Quiz) => (
          <div key={quiz.id} style={{ width: "250px" }}>
            <Card
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={quiz.imageURL}
                alt={quiz.title}
              />
              <CardContent>
                <Typography variant="h6">{quiz.title}</Typography>
                {quiz.category && (
                  <Typography variant="body2" color="textSecondary">
                    {quiz.category.name}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
