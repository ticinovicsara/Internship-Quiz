import React from "react";
import {
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Question } from "../types/question";
import { QuestionType } from "../types/questionType";
import {
  FillInTheBlankAnswerInput,
  MultipleAnswerInput,
  SliderAnswerInput,
  SortAnswerInput,
  MatchingAnswerInput,
} from "./inputs";

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
  const handleOptionChange = (
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onOptionChange(index, optionIndex, e.target.value);
  };

  const handleSortChange = (newValue: string[]) =>
    onQuestionChange(index, "options", newValue);

  const handleMatchingChange = (newValue: string[]) =>
    onQuestionChange(index, "corrAnswer", newValue);

  const handleCorrAnswerChange = (value: any) =>
    onQuestionChange(index, "corrAnswer", value);

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label={`Question ${index + 1} Text`}
        fullWidth
        value={question.text}
        onChange={(e) => onQuestionChange(index, "text", e.target.value)}
        sx={{
          mb: 2,
          border: "2px solid purple",
          borderRadius: "4px",
          marginTop: "20px",
        }}
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

      {question.type === QuestionType.FILL_IN_THE_BLANK && (
        <>
          <FillInTheBlankAnswerInput
            corrAnswer={question.corrAnswer}
            onChange={handleCorrAnswerChange}
          />
        </>
      )}

      {question.type === QuestionType.MULTIPLE && (
        <>
          {(question.options ?? []).map((option, optionIndex) => (
            <TextField
              key={optionIndex}
              label={`Option ${optionIndex + 1}`}
              fullWidth
              value={option}
              onChange={(e) => handleOptionChange(optionIndex, e)}
              sx={{ mb: 2 }}
            />
          ))}

          {question.options &&
            question.options.filter((opt) => opt.trim() !== "").length > 0 && (
              <>
                <MultipleAnswerInput
                  corrAnswer={question.corrAnswer}
                  options={question.options}
                  onChange={handleCorrAnswerChange}
                />
              </>
            )}
        </>
      )}

      {question.type === QuestionType.SLIDER && (
        <>
          <SliderAnswerInput
            corrAnswer={question.corrAnswer}
            onChange={handleCorrAnswerChange}
          />
        </>
      )}

      {question.type === QuestionType.SORT && (
        <>
          <SortAnswerInput
            corrAnswer={question.options || []}
            onChange={handleSortChange}
          />
        </>
      )}

      {question.type === QuestionType.MATCHING && (
        <>
          <TextField
            label="Matching Options (Right Side Only)"
            fullWidth
            multiline
            value={(question.options ?? []).join(", ")}
            onChange={(e) => {
              const newOptions = e.target.value
                .split(",")
                .map((opt) => opt.trim());
              onQuestionChange(index, "options", newOptions);
            }}
            helperText='Enter right-side matches only, separated by commas. Example: "Round Shape, Four-sided Shape"'
            sx={{ mb: 2 }}
          />

          <MatchingAnswerInput
            corrAnswer={
              Array.isArray(question.corrAnswer) ? question.corrAnswer : []
            }
            onChange={handleMatchingChange}
          />
        </>
      )}
    </Box>
  );
};
