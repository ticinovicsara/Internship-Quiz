import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

interface MatchingProps {
  corrAnswer: string[]; // backend array of valid pairs, e.g. ["jabuka - voće", "kruska - voće"]
  onChange: (newValue: string[]) => void;
}

export const MatchingAnswerInput: React.FC<MatchingProps> = ({
  corrAnswer,
  onChange,
}) => {
  // Local state holds the raw string that the user types.
  const [inputValue, setInputValue] = useState<string>(
    Array.isArray(corrAnswer) ? corrAnswer.join(", ") : ""
  );

  useEffect(() => {
    setInputValue(Array.isArray(corrAnswer) ? corrAnswer.join(", ") : "");
  }, [corrAnswer]);

  return (
    <TextField
      label='Correct Matches (e.g. "Left - Right")'
      fullWidth
      multiline
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      // On blur, parse the input. Only update with entries that contain "-" so incomplete pairs stay local.
      onBlur={() => {
        const newValue = inputValue
          .split(",")
          .map((pair) => pair.trim())
          .filter((pair) => pair.includes("-"));
        onChange(newValue);
      }}
      helperText='Enter matches in format "Left - Right", separated by commas.'
      sx={{ mb: 2 }}
    />
  );
};
