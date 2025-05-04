import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

interface SortProps {
  corrAnswer: string;
  options: string[];
  onChange: (newValue: string) => void;
}

export const SortAnswerInput: React.FC<SortProps> = ({
  corrAnswer,
  options,
  onChange,
}) => {
  const initialValue = corrAnswer.trim() ? corrAnswer : options.join(", ");

  const [inputValue, setInputValue] = useState<string>(initialValue);

  useEffect(() => {
    setInputValue(corrAnswer.trim() ? corrAnswer : options.join(", "));
  }, [corrAnswer, options]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    onChange(inputValue);
  };

  return (
    <TextField
      label="Correct Order (comma-separated)"
      fullWidth
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText="Enter the correct order of items. Example: Banana, Apple, Orange"
      sx={{ mb: 2 }}
    />
  );
};
