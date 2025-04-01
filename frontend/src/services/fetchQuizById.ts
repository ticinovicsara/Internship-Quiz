import apiClient from "./apiClient";

export async function fetchQuizById(quizId: string) {
  try {
    const response = await apiClient.get(`/quiz/${quizId}`);

    if (!response) {
      throw new Error("Network response was not ok");
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
    throw error;
  }
}
