import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

export function RegisterPage() {
  const { registerUser, loading, error } = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await registerUser(email, password, name);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          value={name}
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
