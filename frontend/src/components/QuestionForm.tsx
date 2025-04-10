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
  QuestionTextInput,
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

  const handleMatchingChange = (newValue: string[]) =>
    onQuestionChange(index, "corrAnswer", newValue);

  const handleCorrAnswerChange = (value: any) => {
    if (question.type === QuestionType.SORT) {
      const sortedValue = Array.isArray(value) ? value : [];
      onQuestionChange(index, "corrAnswer", sortedValue);
    } else {
      const stringValue = Array.isArray(value)
        ? value.join(", ")
        : String(value);
      onQuestionChange(index, "corrAnswer", stringValue);
    }

    if (question.type === QuestionType.MULTIPLE) {
      const options = Array.isArray(value.options)
        ? value
        : String(value)
            .split(",")
            .map((v) => v.trim());
      onQuestionChange(index, "options", options);
    }
  };

  const ensureString = (val: string | string[]) =>
    Array.isArray(val) ? val.join(", ") : val;

  return (
    <Box sx={{ mb: 2 }}>
      <QuestionTextInput
        text={question.text}
        onChange={(newText) => onQuestionChange(index, "text", newText)}
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
            corrAnswer={ensureString(question.corrAnswer)}
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
                  corrAnswer={ensureString(question.corrAnswer)}
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
            corrAnswer={ensureString(question.corrAnswer)}
            onChange={handleCorrAnswerChange}
          />
        </>
      )}

      {question.type === QuestionType.SORT && (
        <SortAnswerInput
          corrAnswer={question.corrAnswer}
          options={question.options ?? []}
          onChange={handleCorrAnswerChange}
        />
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
