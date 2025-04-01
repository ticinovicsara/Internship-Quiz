import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";
import { isAuthenticated, logout } from "../utils/auth";

export function Navigation() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate(`/quizzes?search=${search}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <TextField
          label="Search for quizzes"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>

        {isAuthenticated() ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
