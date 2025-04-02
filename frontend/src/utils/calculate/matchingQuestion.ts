import { Question } from "../../types/question";

export const calculateMatchingScore = (
  question: Question,
  userAnswer: { [key: string]: string }
) => {
  const correctAnswers: string[] =
    typeof question.corrAnswer === "string"
      ? JSON.parse(question.corrAnswer)
      : question.corrAnswer;

  let isCorrect = true;

  correctAnswers.forEach((correctPair: string) => {
    const [item, correctOption] = correctPair.split("-");
    if (userAnswer[item] !== correctOption) {
      isCorrect = false;
    }
  });

  return isCorrect ? 1 : 0;
};
