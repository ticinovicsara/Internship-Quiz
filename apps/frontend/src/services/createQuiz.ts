import { CreateQuizType } from "../types/createQuiz";
import apiClient from "./apiClient";

export const createQuiz = async (quizData: CreateQuizType) => {
  console.log("Quiz data to be sent:", quizData);

  try {
    const response = await apiClient.post("/quiz", quizData);
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};
