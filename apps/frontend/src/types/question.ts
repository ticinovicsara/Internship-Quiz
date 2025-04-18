export type Question = {
  id: number;
  type: string;
  text: string;
  options?: string[];
  corrAnswer: string | string[];
};
