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
import { CorrectAnswerComponent } from "./CorrectAnswerComponent";

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
  const handleSortChange = (
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newOptions = [...(question.options ?? [])];
    newOptions[optionIndex] = e.target.value;

    onQuestionChange(index, "options", newOptions);
  };

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
          <CorrectAnswerComponent
            type={question.type}
            corrAnswer={question.corrAnswer}
            onChange={(value) => onQuestionChange(index, "corrAnswer", value)}
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
              onChange={(e) =>
                onOptionChange(index, optionIndex, e.target.value)
              }
              sx={{ mb: 2 }}
            />
          ))}

          {question.options &&
            question.options.filter((opt) => opt.trim() !== "").length > 0 && (
              <CorrectAnswerComponent
                type={question.type}
                corrAnswer={question.corrAnswer}
                onChange={(value) =>
                  onQuestionChange(index, "corrAnswer", value)
                }
                options={question.options}
              />
            )}
        </>
      )}

      {question.type === QuestionType.SLIDER && (
        <CorrectAnswerComponent
          type={question.type}
          corrAnswer={question.corrAnswer}
          onChange={(value) => onQuestionChange(index, "corrAnswer", value)}
        />
      )}

      {question.type === QuestionType.SORT && (
        <>
          {Array.from({ length: 4 }).map((_, optionIndex) => (
            <TextField
              key={optionIndex}
              label={`Option ${optionIndex + 1}`}
              fullWidth
              value={question.options ? question.options[optionIndex] : ""}
              onChange={(e) => handleSortChange(optionIndex, e)}
              sx={{ mb: 2 }}
            />
          ))}

          {question.options &&
            question.options.filter((opt) => opt.trim() !== "").length > 0 && (
              <CorrectAnswerComponent
                type={question.type}
                corrAnswer={question.corrAnswer}
                onChange={(value) =>
                  onQuestionChange(index, "corrAnswer", value)
                }
                options={question.options}
              />
            )}
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

          <CorrectAnswerComponent
            type={question.type}
            corrAnswer={question.corrAnswer}
            onChange={(value) => onQuestionChange(index, "corrAnswer", value)}
          />
        </>
      )}
    </Box>
  );
};
