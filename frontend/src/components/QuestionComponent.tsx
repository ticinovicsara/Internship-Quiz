import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { QuestionType } from "../types/questionType";
import { QuestionComponentProps } from "./IQuestionComponentProps";

export function QuestionComponent({
  question,
  userAnswer,
  onAnswerChange,
  onAnswerSelection,
}: QuestionComponentProps) {
  console.log("Question:", question);
  console.log("options:", question.options);
  console.log("answer:", question.corrAnswer);

  const options: string[] = Array.isArray(question.options)
    ? question.options
    : typeof question.options === "string"
    ? JSON.parse(question.options)
    : [];

  const correctAnswers: string[] =
    typeof question.corrAnswer === "string"
      ? JSON.parse(question.corrAnswer)
      : question.corrAnswer;

  const itemsToMatch = correctAnswers.map((pair) => pair.split("-")[0]);

  const handleMatchChange = (item: string, value: string) => {
    const updatedAnswers = { ...userAnswer, [item]: value };
    onAnswerChange(question.id, updatedAnswers);
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const updatedAnswer = { answer: newValue as number };
    onAnswerChange(question.id, updatedAnswer);
  };

  const sortedAnswer: string[] = Array.isArray(userAnswer["answer"])
    ? userAnswer["answer"]
    : options;

  const handleSortChange = (index: number, newIndex: number) => {
    const updatedAnswer = [...sortedAnswer];
    const movedItem = updatedAnswer.splice(index, 1)[0];
    updatedAnswer.splice(newIndex, 0, movedItem);

    onAnswerChange(question.id, { answer: updatedAnswer });
  };

  console.log("Parsed options:", options);

  console.log("UserAnsw: ", userAnswer);

  return (
    <Box
      style={{
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

      {question.type === QuestionType.MULTIPLE && (
        <FormControl component="fieldset">
          <RadioGroup
            value={userAnswer.answer || ""}
            onChange={(e) => onAnswerSelection(question.id, e.target.value)}
          >
            {Array.isArray(options) &&
              options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  style={{
                    backgroundColor:
                      userAnswer.answer === option ? "lightblue" : "",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                />
              ))}
          </RadioGroup>
        </FormControl>
      )}

      {question.type === QuestionType.FILL_IN_THE_BLANK && (
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Your answer"
          value={userAnswer["answer"] || ""}
          onChange={(e) =>
            onAnswerChange(question.id, { answer: e.target.value })
          }
          style={{
            backgroundColor: "#ffffff",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        />
      )}

      {question.type === QuestionType.MATCHING &&
        itemsToMatch.map((item, index) => (
          <FormControl key={index} fullWidth style={{ margin: "10px 0" }}>
            <InputLabel>{item}</InputLabel>
            <Select
              value={userAnswer[item] || ""}
              onChange={(e) => handleMatchChange(item, e.target.value)}
            >
              {options.map((option, i) => (
                <MenuItem key={i} value={option} style={{ color: "black" }}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}

      {question.type === QuestionType.SORT && (
        <Box>
          <Typography variant="body1" gutterBottom>
            Sort the answers in the correct order
          </Typography>

          <List>
            {sortedAnswer.map((option, index) => (
              <ListItem key={index} style={{ marginBottom: "10px" }}>
                <ListItemText primary={`${index + 1}. ${option}`} />
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => handleSortChange(index, index - 1)} // Move up
                    disabled={index === 0}
                    size="large"
                  >
                    ↑
                  </Button>
                  <Button
                    onClick={() => handleSortChange(index, index + 1)} // Move down
                    disabled={index === options.length - 1}
                    size="large"
                  >
                    ↓
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {question.type === QuestionType.SLIDER && (
        <Box style={{ width: "100%", marginTop: "20px" }}>
          <Typography variant="body1" gutterBottom>
            {userAnswer["answer"]
              ? `Value: ${userAnswer["answer"]}`
              : "Value: 0"}
          </Typography>
          <Slider
            value={Number(userAnswer["answer"]) || 0}
            onChange={handleSliderChange}
            aria-labelledby="slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => value}
            step={1}
            min={0}
            max={100}
          />
        </Box>
      )}
    </Box>
  );
}
