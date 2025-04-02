import { Question } from "../../types/question";
import { calculateMatchingScore } from "./matchingQuestion";
import { calculateSliderScore } from "./sliderQuestion";

export const calculateScore = (
  questions: Question[],
  userAnswers: { [key: number]: { [key: string]: any } }
) => {
  let totalScore = 0;

  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];

    if (question.type === "matching") {
      totalScore += calculateMatchingScore(question, userAnswer);
    } else if (question.type === "slider") {
      totalScore += calculateSliderScore(question, {
        answer: userAnswer.answer,
      });
    } else {
      const correctAnswers =
        typeof question.corrAnswer === "string"
          ? JSON.parse(question.corrAnswer)
          : question.corrAnswer;

      if (userAnswer && correctAnswers.includes(Object.values(userAnswer)[0])) {
        totalScore++;
      }
    }
  });

  return totalScore;
};
