import { QuestionType } from "../../types";
import { Question } from "../../types/question";
import { calculateMatchingScore } from "./matchingQuestion";
import { calculateSortScore } from "./sortScore";

export const calculateScore = (
  questions: Question[],
  userAnswers: { [key: number]: { [key: string]: any } }
): number => {
  let totalScore = 0;

  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];

    if (!userAnswer) return;

    const questionType = question.type;
    const correctAnswers =
      typeof question.corrAnswer === "string"
        ? JSON.parse(question.corrAnswer)
        : question.corrAnswer;

    switch (questionType) {
      case QuestionType.MATCHING:
        totalScore += calculateMatchingScore(question, userAnswer);
        break;

      case QuestionType.SORT:
        totalScore += calculateSortScore(question, userAnswer);
        break;

      default:
        const userValue = Object.values(userAnswer)[0];
        if (correctAnswers.includes(userValue)) {
          totalScore++;
        }
        break;
    }
  });

  return totalScore;
};
