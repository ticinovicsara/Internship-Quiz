import { useEffect, useState } from "react";
import { Box, Typography, Snackbar } from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../types/category";
import { postCategory } from "../services/postCategory";
import { CategoryForm } from "../components/CategoryForm";
import { Navigation } from "../components/Navigation";

export const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const apiCategories = useCategories();

  useEffect(() => {
    if (apiCategories?.categories) {
      setCategories(apiCategories.categories);
    }
  }, [apiCategories]);

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const nameTrimmed = categoryName.trim();
    if (!nameTrimmed) {
      setError("Category name cannot be empty.");
      return;
    }

    const alreadyExists = categories.some(
      (cat) => cat.name.toLowerCase() === nameTrimmed.toLowerCase()
    );

    if (alreadyExists) {
      setError("Category already exists.");
      return;
    }

    try {
      const newCategory = await postCategory(nameTrimmed);
      if (newCategory) {
        setCategories((prev) => [...prev, newCategory]);
        setCategoryName("");
        setSuccess(true);
      } else {
        setError("Something went wrong while adding the category.");
      }
    } catch (err) {
      setError("Failed to add category.");
    }
  };

  return (
    <>
      <Navigation />
      <Box sx={{ maxWidth: 500, margin: "auto", padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Category
        </Typography>
        <CategoryForm
          categoryName={categoryName}
          onCategoryNameChange={setCategoryName}
          onSubmit={handleAddCategory}
          error={error}
        />
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          message="Category added successfully!"
        />
      </Box>
    </>
  );
};
