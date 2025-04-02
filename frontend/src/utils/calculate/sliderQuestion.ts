import { Question } from "../../types/question";

export const calculateSliderScore = (
  question: Question,
  userAnswer: { answer: number }
) => {
  const correctAnswer = question.corrAnswer[0];

  return userAnswer.answer === correctAnswer ? 1 : 0;
};
