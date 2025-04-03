import { CreateQuizType } from "../types/createQuiz";
import apiClient from "./apiClient";

export const createQuiz = async (quizData: CreateQuizType) => {
  try {
    const response = await apiClient.post("/quiz");
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};
