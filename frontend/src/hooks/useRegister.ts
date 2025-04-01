import { useState } from "react";
import { register } from "../services/register";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(email, password, name);
      setLoading(false);
      return data;
    } catch (err) {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
}
