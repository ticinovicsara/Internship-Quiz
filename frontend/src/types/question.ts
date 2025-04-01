export type Question = {
  id: number;
  type: string;
  questionText: string;
  options?: string[];
  answer: string;
};
