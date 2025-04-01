import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { TextField, Button, Typography, Container } from "@mui/material";
import { data, Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const { loginUser, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await loginUser(email, password);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      navigate("/quizzes");
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/quizzes");
    }
  }, []);

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        {error && (
          <Typography color="error" align="center" margin="normal">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "16px" }}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>

      <Typography variant="h6" gutterBottom align="center" marginTop={"10px"}>
        Don't have an account?{" "}
        <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
          REGISTER
        </Link>
      </Typography>
    </Container>
  );
}
