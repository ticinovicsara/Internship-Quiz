import { useState } from "react";
import {
  Box,
  Typography,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import { postCategory } from "../services/postCategory";
import { CategoryForm } from "../components/CategoryForm";
import { Navigation } from "../components/Navigation";

export const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const { categories, refetch } = useCategories();

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameTrimmed = categoryName.trim();
    if (!nameTrimmed) {
      setAlertType("error");
      setAlertMessage("Category name cannot be empty.");
      return;
    }

    const alreadyExists = categories.some(
      (cat) => cat.name.toLowerCase() === nameTrimmed.toLowerCase()
    );

    if (alreadyExists) {
      setAlertType("error");
      setAlertMessage("Category already exists.");
      return;
    }

    try {
      const result = await postCategory(nameTrimmed);

      if (result?.success === false) {
        setAlertType("error");
        setAlertMessage(result.message || "Failed to add category.");
        return;
      }

      if (result && result.id) {
        await refetch();
        setCategoryName("");
        setAlertType("success");
        setAlertMessage(result.message || "Category added successfully!");
      } else {
        setAlertType("error");
        setAlertMessage("Unexpected server response.");
      }
    } catch (err) {
      setAlertType("error");
      setAlertMessage("Failed to add category.");
    }
  };

  return (
    <>
      <Navigation />
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 4,
        }}
      >
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Add Category
        </Typography>
        <CategoryForm
          categoryName={categoryName}
          onCategoryNameChange={setCategoryName}
          onSubmit={handleAddCategory}
          error={alertMessage}
        />
        <Snackbar
          open={!!alertMessage}
          autoHideDuration={4000}
          onClose={() => setAlertMessage("")}
          message={alertMessage}
          ContentProps={{
            sx: {
              backgroundColor: alertType === "success" ? "green" : "red",
              color: "#fff",
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />

        <Typography variant="h6" sx={{ mt: 5, textAlign: "center" }}>
          Current Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem key={category.id} style={{ textAlign: "center" }}>
              <ListItemText secondary={category.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
