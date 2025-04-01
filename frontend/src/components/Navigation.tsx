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
    <AppBar position="static" style={{ padding: "10px" }}>
      <Toolbar style={{ justifyContent: "space-between", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextField
            label="Search for quizzes"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              minWidth: 150,
              border: "1px solid #ccc",
              backgroundColor: "whitesmoke",
              borderRadius: "4px",
            }}
            size="small"
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </div>

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
