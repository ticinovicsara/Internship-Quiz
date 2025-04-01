import { useState } from "react";
import { login } from "../services/login";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setLoading(false);
      return data;
    } catch (err) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
}
