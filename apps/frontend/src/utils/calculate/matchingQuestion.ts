import { Question } from "../../types";

export const calculateMatchingScore = (
  question: Question,
  userAnswer: { [key: string]: any }
): number => {
  const correctAnswers: string[] =
    typeof question.corrAnswer === "string"
      ? JSON.parse(question.corrAnswer)
      : question.corrAnswer;

  if (userAnswer.answer) {
    const userAnswerArray = userAnswer.answer;
    let isCorrect = true;

    correctAnswers.forEach((correctPair) => {
      if (!userAnswerArray.includes(correctPair)) {
        isCorrect = false;
      }
    });

    return isCorrect ? 1 : 0;
  }

  return 0;
};
