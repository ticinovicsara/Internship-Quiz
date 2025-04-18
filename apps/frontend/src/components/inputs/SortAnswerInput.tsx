import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

interface SortProps {
  corrAnswer: string[] | string;
  options: string[];
  onChange: (newValue: string[]) => void;
}

export const SortAnswerInput: React.FC<SortProps> = ({
  corrAnswer,
  options,
  onChange,
}) => {
  const toArray = (val: string | string[]): string[] => {
    if (Array.isArray(val)) return val;
    return val
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;

    const initial = toArray(corrAnswer);

    if (initial.length === 0 && options.length > 0) {
      const defaultOrder = options;
      setInputValue(defaultOrder.join(", "));
      onChange(defaultOrder);
    } else {
      setInputValue(initial.join(", "));
    }
  }, [corrAnswer, options, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const inputItems = toArray(inputValue);
    const filtered = inputItems.filter((item) => options.includes(item));
    onChange(filtered);
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
