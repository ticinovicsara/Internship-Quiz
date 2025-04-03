import {
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Question } from "../types/question";

interface QuestionFormProps {
  question: Question;
  index: number;
  onQuestionChange: (index: number, field: string, value: any) => void;
  onOptionChange: (index: number, optionIndex: number, value: string) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  index,
  onQuestionChange,
  onOptionChange,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label={`Question ${index + 1} Text`}
        fullWidth
        value={question.text}
        onChange={(e) => onQuestionChange(index, "text", e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={question.type}
          onChange={(e) => onQuestionChange(index, "type", e.target.value)}
          label="Type"
        >
          <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
          <MenuItem value="text">Text</MenuItem>
        </Select>
      </FormControl>

      {question.type === "multipleChoice" && (
        <>
          {question.options.map((option, optionIndex) => (
            <TextField
              key={optionIndex}
              label={`Option ${optionIndex + 1}`}
              fullWidth
              value={option}
              onChange={(e) =>
                onOptionChange(index, optionIndex, e.target.value)
              }
              sx={{ mb: 2 }}
            />
          ))}
          <TextField
            label="Correct Answer"
            fullWidth
            value={question.corrAnswer}
            onChange={(e) =>
              onQuestionChange(index, "corrAnswer", e.target.value)
            }
            sx={{ mb: 2 }}
          />
        </>
      )}
    </Box>
  );
};
