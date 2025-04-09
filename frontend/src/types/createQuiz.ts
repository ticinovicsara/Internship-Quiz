import { Question } from "./question";

export interface CreateQuizType {
  title: string;
  categoryId: string;
  imageURL: string;
  questions: Question[];
}
