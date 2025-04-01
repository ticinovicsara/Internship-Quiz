import { useEffect, useState } from "react";
import { fetchQuizzes } from "../services/fetchQuizzes";

export function useQuizzes(searchQuery: string) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getQuizzes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchQuizzes();
        if (searchQuery) {
          setQuizzes(
            data.filter((q: any) =>
              q.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        } else {
          setQuizzes(data);
        }
      } catch (err) {
        setError("Failed to fetch quizzes.");
      }
      setLoading(false);
    };

    getQuizzes();
  }, [searchQuery]);

  return { quizzes, loading, error };
}
