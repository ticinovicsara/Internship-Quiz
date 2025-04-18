import React, { useCallback } from "react";
import { TextField } from "@mui/material";

interface QuestionTextInputProps {
  text: string;
  onChange: (newText: string) => void;
}

export const QuestionTextInput: React.FC<QuestionTextInputProps> = React.memo(
  ({ text, onChange }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <TextField
        label="Question Text"
        fullWidth
        value={text}
        onChange={handleChange}
        sx={{
          mb: 2,
          border: "2px solid purple",
          borderRadius: "4px",
          marginTop: "20px",
        }}
      />
    );
  }
);
