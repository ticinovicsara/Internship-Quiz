import apiClient from "./apiClient";

export async function fetchAllScores() {
  try {
    const response = await apiClient.get("/users/leaderboardfull");

    return response.data;
  } catch (error) {
    console.error("Error fetching FULL leaderboard:", error);
    throw error;
  }
}
