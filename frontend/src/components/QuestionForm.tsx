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
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    console.log("Slider value:", value);

    onQuestionChange(index, "corrAnswer", value);
  };

  const handleSortChange = (
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newOptions = [...(question.options ?? [])];
    newOptions[optionIndex] = e.target.value;

    onQuestionChange(index, "options", newOptions);
  };

  const handleMatchingChange = (
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newOptions = [...(question.options ?? [])];
    newOptions[optionIndex] = e.target.value;

    if (optionIndex === newOptions.length - 1 && e.target.value.trim() !== "") {
      newOptions.push("");
    }

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
          border: "2px solid dodgerblue",
          borderRadius: "4px",
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

      {question.type === QuestionType.SLIDER && (
        <TextField
          label="Correct Answer (Number)"
          fullWidth
          value={question.corrAnswer}
          onChange={handleSliderChange}
          type="number"
          sx={{ mb: 2 }}
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
        </>
      )}

      {question.type === QuestionType.MATCHING && (
        <>
          {(question.options ?? []).map((match, matchIndex) => (
            <TextField
              key={matchIndex}
              label={`Match ${matchIndex + 1} (e.g. "Circle - Round Shape")`}
              fullWidth
              value={match}
              onChange={(e) => handleMatchingChange(matchIndex, e)}
              sx={{ mb: 2 }}
            />
          ))}
        </>
      )}

      {question.type !== QuestionType.SLIDER &&
        question.type !== QuestionType.FILL_IN_THE_BLANK && (
          <TextField
            label="Correct Answer"
            fullWidth
            value={question.corrAnswer}
            onChange={(e) =>
              onQuestionChange(index, "corrAnswer", e.target.value)
            }
            sx={{ mb: 2 }}
          />
        )}
    </Box>
  );
};
