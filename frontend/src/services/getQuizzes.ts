// services/quizService.ts
import apiClient from "@/services/apiClient";

export async function getQuizzes(searchQuery: string) {
  try {
    const response = await apiClient.get("/quizzes", {
      params: { search: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}
