import { Typography } from "@mui/material";

interface ScoreSectionProps {
  score: number;
  totalQuestions: number;
}

export function ScoreSection({ score, totalQuestions }: ScoreSectionProps) {
  return (
    <Typography variant="h6" style={{ marginTop: "20px" }}>
      Your score: {score} / {totalQuestions}
    </Typography>
  );
}
