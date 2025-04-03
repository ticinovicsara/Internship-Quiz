import { Category } from "./category";
import { Question } from "./question";

export interface CreateQuizType {
  title: string;
  category: Category | null;
  imageURL: string;
  questions: Question[];
}
