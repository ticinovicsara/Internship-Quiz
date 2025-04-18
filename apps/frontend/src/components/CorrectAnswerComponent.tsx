import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { QuestionType } from "../types/questionType";
import { memo } from "react";

interface Props {
  type: QuestionType;
  corrAnswer: any;
  onChange: (value: any) => void;
  options?: string[];
}

export const CorrectAnswerComponent: React.FC<Props> = memo(
  ({ type, corrAnswer, onChange, options }: Props) => {
    console.log("Options u CorrectAnswerComponent:", options);

    switch (type) {
      case QuestionType.FILL_IN_THE_BLANK:
        return (
          <TextField
            label="Correct Answer"
            fullWidth
            value={corrAnswer || ""}
            onChange={(e) => onChange(e.target.value)}
            sx={{ mb: 2 }}
          />
        );

      case QuestionType.SLIDER:
        return (
          <TextField
            label="Correct Answer (Number)"
            fullWidth
            type="number"
            value={corrAnswer || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            sx={{ mb: 2 }}
          />
        );

      case QuestionType.MULTIPLE:
        return (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Correct Answer</InputLabel>
            <Select
              value={corrAnswer || ""}
              onChange={(e) => onChange(e.target.value)}
              label="Correct Answer"
            >
              {(options ?? []).map((option: string, i: number) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case QuestionType.SORT:
        return (
          <TextField
            label="Correct Order (comma-separated)"
            fullWidth
            value={Array.isArray(corrAnswer) ? corrAnswer.join(", ") : ""}
            onChange={(e) => {
              const inputValue = e.target.value;

              const newValue = inputValue
                .split(",")
                .map((v) => v.trim())
                .filter((v) => v !== "");

              onChange(newValue);
            }}
            helperText="Enter the correct order of items. Example: Banana, Apple, Orange"
            sx={{ mb: 2 }}
          />
        );

      case QuestionType.MATCHING:
        return (
          <TextField
            label='Correct Matches (e.g. "Left - Right")'
            fullWidth
            multiline
            value={Array.isArray(corrAnswer) ? corrAnswer.join(", ") : ""}
            onChange={(e) => {
              const inputValue = e.target.value;

              const newValue = inputValue
                .split(",")
                .map((pair) => pair.trim())
                .filter((pair) => {
                  return pair.includes("-") || pair === "";
                });

              onChange(newValue);
            }}
            helperText='Enter matches in format "Left - Right", separated by commas.'
            sx={{ mb: 2 }}
          />
        );

      default:
        return null;
    }
  }
);
