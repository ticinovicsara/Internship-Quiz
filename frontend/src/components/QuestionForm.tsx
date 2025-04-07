import {
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Question } from "../types/question";
import { QuestionType } from "../types/questionType"; // ili gde već držiš enum

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
          {Object.entries(QuestionType).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value.replace(/_/g, " ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {question.type === QuestionType.MULTIPLE && (
        <>
          {(question.options ?? []).map((option, optionIndex) => (
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
        </>
      )}
      <TextField
        label="Correct Answer"
        fullWidth
        value={question.corrAnswer}
        onChange={(e) => onQuestionChange(index, "corrAnswer", e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};
