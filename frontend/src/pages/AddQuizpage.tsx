import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";

export function AddQuiz() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const quizData = { title, categoryId, imageURL, questions };
    console.log("Submitting quiz:", quizData);
    fetch("/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: "auto", p: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Add new quiz
      </Typography>
      <TextField
        label="Naslov"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Kategorija"
        fullWidth
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
        sx={{ mb: 2 }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="URL slike"
        fullWidth
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Typography variant="h6">Pitanja</Typography>
      {questions.map((q, index) => (
        <TextField
          key={index}
          label={`Pitanje ${index + 1}`}
          fullWidth
          value={q}
          onChange={(e) => handleQuestionChange(index, e.target.value)}
          sx={{ mb: 2 }}
        />
      ))}
      <Button onClick={handleAddQuestion} variant="outlined" sx={{ mb: 2 }}>
        Add quiz
      </Button>
    </Box>
  );
}
