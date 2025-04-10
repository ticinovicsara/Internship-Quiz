import apiClient from "./apiClient";

export async function fetchUserScoresByQuiz(quizId: string) {
  try {
    const response = await apiClient.get(`/users/leaderboard/${quizId}`);

    console.log("Fetched user leaderboard:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
}
