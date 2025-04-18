import apiClient from "./apiClient";

export async function deleteQuiz(quizId: string) {
  try {
    const response = await apiClient.delete(`/quiz/${quizId}`);

    if (!response) {
      throw new Error("Network response was not ok");
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Failed to delete quiz:", error);
    throw error;
  }
}
