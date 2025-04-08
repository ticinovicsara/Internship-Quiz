import { TextField, Button, Alert } from "@mui/material";

interface Props {
  categoryName: string;
  onCategoryNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

export const CategoryForm = ({
  categoryName,
  onCategoryNameChange,
  onSubmit,
  error,
}: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Category Name"
        fullWidth
        value={categoryName}
        onChange={(e) => onCategoryNameChange(e.target.value)}
        margin="normal"
      />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Category
      </Button>
    </form>
  );
};
