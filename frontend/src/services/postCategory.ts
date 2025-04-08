import apiClient from "./apiClient";

export const postCategory = async (categoryName: string) => {
  try {
    const response = await apiClient.post("/quiz/categories", {
      name: categoryName,
    });

    return response.data;
  } catch (err) {
    console.error("Error adding category:", err);
  }
};
