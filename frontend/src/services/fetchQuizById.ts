import apiClient from "./apiClient";

export async function getQuizzes(id: string) {
  try {
    const response = await apiClient.get("/quiz", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz with ID:", id);
    throw error;
  }
}
