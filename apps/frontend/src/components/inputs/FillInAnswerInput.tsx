import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

interface FillInTheBlankAnswerInputProps {
  corrAnswer: string;
  onChange: (newValue: string) => void;
}

export const FillInTheBlankAnswerInput: React.FC<
  FillInTheBlankAnswerInputProps
> = ({ corrAnswer, onChange }) => {
  const [inputValue, setInputValue] = useState(corrAnswer || "");

  useEffect(() => {
    setInputValue(corrAnswer || "");
  }, [corrAnswer]);

  return (
    <TextField
      label="Correct Answer"
      fullWidth
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => onChange(inputValue)}
      sx={{ mb: 2 }}
    />
  );
};
