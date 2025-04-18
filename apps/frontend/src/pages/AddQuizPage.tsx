import { useState, useCallback } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import { createQuiz } from "../services/createQuiz";
import { toast } from "react-toastify";
import { QuestionForm } from "../components/QuestionForm";
import { Navigation } from "../components/Navigation";
import { initialQuestions } from "../utils/initialQuestions";
import { Question, Category, QuestionType, CreateQuizType } from "../types";

export function AddQuizPage() {
  const [, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [category, setCategory] = useState<Category | null>(null);
  const { categories } = useCategories();

  const handleQuestionChange = useCallback(
    (index: number, field: string, value: any) => {
      const newQuestions = [...questions];
      if (newQuestions[index]) {
        (newQuestions[index] as any)[field] = value;
      }
      setQuestions(newQuestions);
    },
    [questions]
  );

  const handleOptionChange = useCallback(
    (index: number, optionIndex: number, value: string) => {
      const updatedQuestions = [...questions];
      if (updatedQuestions[index] && updatedQuestions[index].options) {
        updatedQuestions[index].options[optionIndex] = value;
      }
      setQuestions(updatedQuestions);
    },
    [questions]
  );

  const formatQuestionData = (questions: Question[]) => {
    return questions.map((q) => {
      if (q.type === QuestionType.MATCHING) {
        const formattedOptions = q.options?.map((option) => option.trim());
        return {
          ...q,
          options: formattedOptions,
          corrAnswer: q.corrAnswer as string,
        };
      }

      if (q.type === QuestionType.SORT) {
        let formattedCorrAnswer: string[];
        if (typeof q.corrAnswer === "string") {
          formattedCorrAnswer = [q.corrAnswer.trim()];
        } else if (Array.isArray(q.corrAnswer)) {
          formattedCorrAnswer = (q.corrAnswer as string[]).map((item) =>
            item.trim()
          );
        } else {
          formattedCorrAnswer = [];
        }
        return {
          ...q,
          corrAnswer: formattedCorrAnswer.join(", "), // Convert array to a string to match the Question type
        };
      }

      return q;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedQuestions = formatQuestionData(questions);

    if (formattedQuestions.length !== 5) {
      toast.error("You must have exactly 5 questions.");
      return;
    }

    if (!title || !category || !imageURL) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setQuestions(formattedQuestions);

    const quizData: CreateQuizType = {
      title,
      categoryId: category.id,
      imageURL,
      questions: formattedQuestions,
    };

    try {
      setLoading(true);
      const response = await createQuiz(quizData);
      if (response) {
        console.log("Quiz created successfully:", response);
        toast.success("Quiz created successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setImageURL("");
    setCategory(null);
    setQuestions(initialQuestions);
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
          value={category?.id || ""}
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
