import { Question } from "../types/question";
import { QuestionType } from "../types/questionType";

export const initialQuestions: Question[] = [
  {
    id: 0,
    text: "",
    type: QuestionType.FILL_IN_THE_BLANK,
    options: ["", "", "", ""],
    corrAnswer: "",
  },
  {
    id: 1,
    text: "",
    type: QuestionType.MULTIPLE,
    options: ["", "", "", ""],
    corrAnswer: "",
  },
  {
    id: 2,
    text: "",
    type: QuestionType.MATCHING,
    options: [""],
    corrAnswer: "True",
  },
  {
    id: 3,
    text: "",
    type: QuestionType.SLIDER,
    options: [],
    corrAnswer: "",
  },
  {
    id: 4,
    text: "",
    type: QuestionType.SORT,
    options: [""],
    corrAnswer: "",
  },
];
