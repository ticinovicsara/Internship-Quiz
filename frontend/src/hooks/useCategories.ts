import { useState, useEffect, useCallback } from "react";
import { fetchCategories } from "../services/fetchCategories";
import { Category } from "../types/category";

export function useCategories() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchCategories();
      console.log("API RESPONSE: ", response.data);
      setCategories(response);
      setError("");
    } catch (err) {
      setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return { categories, loading, error, refetch: loadCategories };
}
