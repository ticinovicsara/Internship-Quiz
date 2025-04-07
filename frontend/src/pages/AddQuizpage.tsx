import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../types/category";
import { createQuiz } from "../services/createQuiz";
import { toast } from "react-toastify";
import { CreateQuizType } from "../types/createQuiz";
import { Question } from "../types/question";
import { QuestionForm } from "../components/QuestionForm";
import { Navigation } from "../components/Navigation";
import { initialQuestions } from "../utils/initialQuestions";

export function AddQuizPage() {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { categories: fetchedCategories } = useCategories();

  useEffect(() => {
    if (fetchedCategories.length > 0) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  console.log("CAT: ", categories);

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    if (newQuestions[index]) {
      (newQuestions[index] as any)[field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    index: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index] && updatedQuestions[index].options) {
      updatedQuestions[index].options[optionIndex] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const quizData: CreateQuizType = { title, category, imageURL, questions };

    console.log("Submitting quiz:", quizData);

    try {
      const response = createQuiz(quizData);
      if (response) {
        console.log("Quiz created successfully:", response);
        toast.success("Quiz created successfully!");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <>
      <Navigation />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, margin: "auto", p: 2, marginTop: "20px" }}
      >
        <Typography variant="h5" gutterBottom>
          Add new quiz
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Category"
          fullWidth
          value={category?.name || ""}
          onChange={(e) => {
            const selectedCategory =
              categories.find((cat) => cat.id === e.target.value) || null;
            setCategory(selectedCategory);
          }}
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
          label="Image URL"
          fullWidth
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Typography variant="h6">Questions</Typography>
        {questions.map((question, index) => (
          <QuestionForm
            key={index}
            question={question}
            index={index}
            onQuestionChange={handleQuestionChange}
            onOptionChange={handleOptionChange}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          sx={{ mb: 2, display: "block" }}
        >
          Add quiz
        </Button>
      </Box>
    </>
  );
}
