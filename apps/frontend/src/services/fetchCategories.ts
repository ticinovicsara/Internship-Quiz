import apiClient from "./apiClient";

export async function fetchCategories() {
  try {
    const response = await apiClient.get("/quiz/categories");

    console.log("FETCH: ", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
