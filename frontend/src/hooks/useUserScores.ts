import { useState, useEffect } from "react";
import { fetchUserScores } from "../services/fetchUserScores";

export function useUsers() {
  const [users, setUsers] = useState<{ username: string; score: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchUserScores();
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
