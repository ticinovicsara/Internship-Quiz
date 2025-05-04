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
    } catch (err: any) {
      setLoading(false);

      if (err.response) {
        const { status, data } = err.response;

        if (status === 401) {
          setError("Incorrect password. Please try again.");
        } else if (status === 404) {
          setError("Email not found. Please register.");
        } else {
          setError(data?.message || "Login failed. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return { loginUser, loading, error };
}
