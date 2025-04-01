import { useState } from "react";
import { register } from "../services/register";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await register(username, email, password);
      setLoading(false);
      return data;
    } catch (err: any) {
      setLoading(false);

      if (err.response) {
        const { status, data } = err.response;

        if (status === 400 && data?.message?.includes("email")) {
          setError("Email already exists. Please use a different one.");
        } else if (status === 400 && data?.message?.includes("username")) {
          setError("Username already taken. Try another one.");
        } else {
          setError(data?.message || "Registration failed. Try again.");
        }
      } else {
        setError("Network error. Check your connection.");
      }

      throw err;
    }
  };

  return { registerUser, loading, error };
}
