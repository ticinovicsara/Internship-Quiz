import { Question } from "./question";
import { Score } from "./score";

export interface Quiz {
  id: string;
  title: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  imageURL: string;
  questions: Question[];
  scores: Score[];
}
