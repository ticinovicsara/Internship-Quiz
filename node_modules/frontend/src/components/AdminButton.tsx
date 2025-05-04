import { Button, Menu, MenuItem } from "@mui/material";
import paths from "../utils/paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleAdminClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAdminClick}
        style={{ marginRight: "10px" }}
      >
        Admin
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(paths.ADD_QUIZ);
          }}
        >
          Add Quiz
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(paths.DELETE_QUIZ);
          }}
        >
          Delete Quiz
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(paths.ADD_CATEGORY);
          }}
        >
          Add Category
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(paths.USER_SCORES);
          }}
        >
          User Scores List
        </MenuItem>
      </Menu>
    </>
  );
};
