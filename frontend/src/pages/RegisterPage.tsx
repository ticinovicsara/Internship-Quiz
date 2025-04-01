import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/validateEmail";

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser, loading, error } = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    if (!valid) return;

    try {
      const data = await registerUser(username, email, password);

      if (data && data.id) {
        localStorage.setItem("token", data.access_token);
        navigate("/quizzes");
        toast.success("Registration successful!");
      } else {
        console.error("Invalid response format:", data);
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Register
      </Typography>
      <form onSubmit={handleRegistration}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
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
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>

      <Typography variant="h6" gutterBottom align="center" marginTop={"10px"}>
        Already have an account?{" "}
        <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
          LOGIN
        </Link>
      </Typography>
    </Container>
  );
}
