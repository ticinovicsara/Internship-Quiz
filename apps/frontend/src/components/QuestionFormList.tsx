import { Box, Typography } from "@mui/material";
import { Question } from "../types/question";
import { QuestionForm } from "./QuestionForm";

interface Props {
  questions: Question[];
  onQuestionChange: (index: number, field: string, value: any) => void;
  onOptionChange: (index: number, optionIndex: number, value: string) => void;
}

export function QuestionFormList({
  questions,
  onQuestionChange,
  onOptionChange,
}: Props) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Questions
      </Typography>
      {questions.map((question, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Question {index + 1}
          </Typography>
          <QuestionForm
            question={question}
            index={index}
            onQuestionChange={onQuestionChange}
            onOptionChange={onOptionChange}
          />
        </Box>
      ))}
    </Box>
  );
}
