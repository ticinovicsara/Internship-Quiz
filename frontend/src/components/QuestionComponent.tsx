import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { Question } from "../types/question";

interface QuestionComponentProps {
  question: Question;
  userAnswer: string;
  onAnswerChange: (questionId: number, answer: string) => void;
}

export function QuestionComponent({
  question,
  userAnswer,
  onAnswerChange,
}: QuestionComponentProps) {
  console.log("Question:", question);
  console.log("options:", question.options);
  console.log("answer:", question.answer);

  const options =
    typeof question.options === "string"
      ? JSON.parse(question.options)
      : question.options;

  return (
    <Box
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        width: "60%",
      }}
    >
      <Typography variant="h6" style={{ marginBottom: "20px" }}>
        {question?.text || "No question text"}
      </Typography>

      {question.type === "multiple_choice" && (
        <FormControl component="fieldset">
          <RadioGroup
            value={userAnswer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
          >
            {Array.isArray(options) &&
              options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  style={{
                    backgroundColor: userAnswer === option ? "lightblue" : "",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                />
              ))}
          </RadioGroup>
        </FormControl>
      )}

      {question.type === "fill_in_the_blank" && (
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Your answer"
          value={userAnswer}
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
          style={{
            backgroundColor: "#ffffff",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        />
      )}

      {question.type === "matching" && (
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Your answer"
          value={userAnswer}
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
          style={{
            backgroundColor: "#ffffff",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        />
      )}

      {question.type === "ordering" && (
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Order your answers"
          value={userAnswer}
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
          style={{
            backgroundColor: "#ffffff",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        />
      )}

      {question.type === "slider" && (
        <TextField
          type="number"
          variant="outlined"
          value={userAnswer}
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
          placeholder="Your answer"
          style={{
            backgroundColor: "#ffffff",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        />
      )}
    </Box>
  );
}
