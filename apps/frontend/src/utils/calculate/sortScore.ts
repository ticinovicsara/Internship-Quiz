import { Question } from "../../types/question";

export const calculateSortScore = (
  question: Question,
  userAnswer: { [key: string]: any }
): number => {
  const correctAnswers: string[] =
    typeof question.corrAnswer === "string"
      ? JSON.parse(question.corrAnswer)
      : question.corrAnswer;

  if (
    !userAnswer.answer ||
    userAnswer.answer.length !== correctAnswers.length
  ) {
    return 0;
  }

  let isCorrect = true;
  userAnswer.answer.forEach((item: string, index: number) => {
    if (item !== correctAnswers[index]) {
      isCorrect = false;
    }
  });

  return isCorrect ? 1 : 0;
};
