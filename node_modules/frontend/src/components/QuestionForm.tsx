import React, { useEffect } from "react";
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
}) => {
  const handleOptionChange = (
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const newOptions = question.options?.map((opt, idx) =>
      idx === optionIndex ? value : opt
    );
    onQuestionChange(index, "options", newOptions);
  };

  const handleMatchingChange = (newPairs: string[]) => {
    onQuestionChange(index, "corrAnswer", newPairs);

    const rightOptions = newPairs.map(
      (pair) => pair.split("-")[1]?.trim() ?? ""
    );
    onQuestionChange(index, "options", rightOptions);
  };

  const handleCorrAnswerChange = (value: any) => {
    if (question.type === QuestionType.SORT) {
      if (typeof value === "string") {
        onQuestionChange(index, "corrAnswer", value);
        const parsedOptions = value.split(",").map((v) => v.trim());
        onQuestionChange(index, "options", parsedOptions);
      }
    } else if (question.type === QuestionType.MULTIPLE) {
      if (typeof value === "string") {
        const options = value.split(",").map((v: string) => v.trim());
        onQuestionChange(index, "corrAnswer", value);
        onQuestionChange(index, "options", options);
      }
    } else {
      const stringValue = Array.isArray(value)
        ? value.join(", ")
        : String(value);
      onQuestionChange(index, "corrAnswer", stringValue);
    }
  };

  useEffect(() => {
    if (question.type === QuestionType.MULTIPLE) {
      ensureMinimumOptions(4);
    }
  }, [question.type]);

  const ensureMinimumOptions = (minCount: number) => {
    if ((question.options?.length ?? 0) < minCount) {
      const filledOptions = [...(question.options ?? [])];
      while (filledOptions.length < minCount) {
        filledOptions.push("");
      }
      onQuestionChange(index, "options", filledOptions);
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

      {question.type === QuestionType.SORT && (
        <SortAnswerInput
          corrAnswer={question.corrAnswer as string}
          options={Array.isArray(question.options) ? question.options : []}
          onChange={handleCorrAnswerChange}
        />
      )}

      {question.type === QuestionType.SLIDER && (
        <>
          <SliderAnswerInput
            corrAnswer={ensureString(question.corrAnswer)}
            onChange={handleCorrAnswerChange}
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
                .map((opt) => opt.trimStart());
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
