import apiClient from "./apiClient";

export async function fetchUserScores() {
  try {
    const response = await apiClient.get("/users/scores");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
