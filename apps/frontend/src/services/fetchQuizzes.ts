import apiClient from "./apiClient";

export async function fetchQuizzes() {
  try {
    const response = await apiClient.get("/quiz");
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}
