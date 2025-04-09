// QuizList.tsx
import React from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import { Quiz } from "../types/quiz";

interface QuizListProps {
  quizzes: Quiz[];
  selectedQuizzes: string[];
  handleSelectQuiz: (id: string) => void;
}

export const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  selectedQuizzes,
  handleSelectQuiz,
}) => {
  return (
    <List>
      {quizzes.map((quiz) => (
        <ListItem key={quiz.id} dense>
          <Checkbox
            checked={selectedQuizzes.includes(quiz.id)}
            onChange={() => handleSelectQuiz(quiz.id)}
            inputProps={{ "aria-labelledby": quiz.id }}
          />
          <ListItemText id={quiz.id} primary={quiz.title} />
        </ListItem>
      ))}
    </List>
  );
};
