import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface MultipleAnswerInputProps {
  corrAnswer: string;
  options: string[];
  onChange: (newValue: string) => void;
}

export const MultipleAnswerInput: React.FC<MultipleAnswerInputProps> = ({
  corrAnswer,
  options,
  onChange,
}) => {
  const [value, setValue] = useState(corrAnswer || "");

  useEffect(() => {
    setValue(corrAnswer || "");
  }, [corrAnswer]);

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Correct Answer</InputLabel>
      <Select
        value={value}
        label="Correct Answer"
        onChange={(e) => setValue(e.target.value as string)}
        onBlur={() => onChange(value)}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
