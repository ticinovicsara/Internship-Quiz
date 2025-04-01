import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { isAuthenticated, logout } from "../utils/auth";

export function Navigation() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate(`/quizzes?search=${search}`);
  };

  return (
    <AppBar
      position="static"
      style={{
        padding: "10px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">QuizTrivia</Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <TextField
            label="Search for quizzes"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              minWidth: 200,
              border: "1px solid #ccc",
              backgroundColor: "whitesmoke",
              borderRadius: "4px",
            }}
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ marginLeft: "10px" }}
          >
            Search
          </Button>
        </Box>

        {isAuthenticated() ? (
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="primary" onClick={() => navigate("/")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
