import apiClient from "./apiClient";

export const postUserResults = async (
  quizId: string,
  username: string,
  score: number
) => {
  try {
    const response = await apiClient.post(`/users/score/${quizId}`, {
      username,
      score,
    });

    console.log("Submitted quiz results:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error submitting quiz results:", error);
    throw error;
  }
};
