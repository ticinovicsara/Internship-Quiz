export interface User {
  username: string;
  quizzes: Record<string, number>;
  totalPoints: number;
}
