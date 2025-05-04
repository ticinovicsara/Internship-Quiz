import { useState, useEffect } from "react";
import { fetchQuizById } from "../services/fetchQuizById";
import { Quiz } from "../types/quiz";

export function useQuiz(quizId: string): {
  quiz: Quiz | undefined;
  loading: boolean;
  error: string | null;
} {
  const [quiz, setQuiz] = useState<Quiz>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getQuiz = async () => {
      if (!quizId) return;

      try {
        setLoading(true);
        const fetchedQuiz = await fetchQuizById(quizId);

        setQuiz(fetchedQuiz);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    getQuiz();
  }, [quizId]);

  return { quiz, loading, error };
}
