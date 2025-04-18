import { TextField } from "@mui/material";

export const SliderAnswerInput = ({
  corrAnswer,
  onChange,
}: {
  corrAnswer: string;
  onChange: (value: string) => void;
}) => (
  <TextField
    type="number"
    label="Correct Value"
    fullWidth
    value={corrAnswer}
    onChange={(e) => onChange(e.target.value)}
    sx={{ mb: 2 }}
  />
);
