import { useState, useEffect } from "react";
import { fetchUserScoresByQuiz } from "../services/fetchUserScoresByQuiz";

export function useUsers(quizId: string) {
  const [users, setUsers] = useState<{ username: string; score: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchUserScoresByQuiz(quizId);
        setUsers(response);
        setLoading(false);
      } catch (err) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
