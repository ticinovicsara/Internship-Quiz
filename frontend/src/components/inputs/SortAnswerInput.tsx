import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

interface SortProps {
  corrAnswer: string[]; // backend value, e.g., ["Banana", "Apple", "Orange"]
  onChange: (newValue: string[]) => void;
}

export const SortAnswerInput: React.FC<SortProps> = ({
  corrAnswer,
  onChange,
}) => {
  // local state holds the raw comma-separated string that the user types
  const [inputValue, setInputValue] = useState<string>(
    Array.isArray(corrAnswer) ? corrAnswer.join(", ") : ""
  );

  // In case the prop changes externally, update the local state.
  useEffect(() => {
    setInputValue(Array.isArray(corrAnswer) ? corrAnswer.join(", ") : "");
  }, [corrAnswer]);

  return (
    <TextField
      label="Correct Order (comma-separated)"
      fullWidth
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      // When the input loses focus, parse it and update the parent's state.
      onBlur={() => {
        const newValue = inputValue
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== "");
        onChange(newValue);
      }}
      helperText="Enter the correct order of items. Example: Banana, Apple, Orange"
      sx={{ mb: 2 }}
    />
  );
};
