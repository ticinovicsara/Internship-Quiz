import { Question } from "../types/question";

export interface QuestionComponentProps {
  question: Question;
  userAnswer: { [key: string]: any };
  onAnswerChange: (questionId: number, answer: { [key: string]: any }) => void;
  onAnswerSelection: (questionId: number, selectedValue: string) => void;
}
