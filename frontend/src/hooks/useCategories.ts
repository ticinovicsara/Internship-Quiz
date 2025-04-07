import { useState, useEffect } from "react";
import { fetchCategories } from "../services/fetchCategories";
import { Category } from "../types/category";

export function useCategories() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();

        console.log("API RESPONSE: ", response.data);

        setCategories(response);
        setLoading(false);
      } catch (err) {
        setError("Error fetching categories");
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
}
