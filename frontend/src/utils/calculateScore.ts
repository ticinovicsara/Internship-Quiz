import { Question } from "../types/question";
import { QuestionType } from "../types/questionType";

/**
 * @param {Question[]} questions
 * @param {Record<number, Record<string, any>>} userAnswers
 * @returns {number}
 */

export const calculateScore = (
  questions: Question[],
  userAnswers: Record<number, Record<string, any>>
): number => {
  let totalScore = 0;

  questions.forEach((question: Question) => {
    const correctAnswers: string[] =
      typeof question.corrAnswer === "string"
        ? JSON.parse(question.corrAnswer)
        : question.corrAnswer;

    const userAnswer = userAnswers[question.id];

    if (question.type === QuestionType.MATCHING) {
      if (userAnswer) {
        let correct = true;

        correctAnswers.forEach((correctPair) => {
          const [item, correctOption] = correctPair.split("-");

          if (userAnswer[item] !== correctOption) {
            correct = false;
          }
        });

        if (correct) {
          totalScore++;
        }
      }
    } else {
      if (userAnswer) {
        const userAnswerValue = Object.values(userAnswer)[0];

        if (correctAnswers.includes(userAnswerValue)) {
          totalScore++;
        }
      }
    }
  });

  return totalScore;
};
