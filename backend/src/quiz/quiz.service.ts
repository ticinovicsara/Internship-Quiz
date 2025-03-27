import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  private quizzes = [];

  findAll() {
    return this.quizzes;
  }

  findQuiz(title: string) {
    return this.quizzes.find((quiz) => quiz.title === title);
  }

  create(quizData) {
    const newQuiz = { id: Date.now().toString(), ...quizData };
    this.quizzes.push(newQuiz);
    return newQuiz;
  }

  update(id: string, updateData) {
    const quizIndex = this.quizzes.find((q) => q.id === id);
    if (!quizIndex) return null;

    this.quizzes[quizIndex] = { ...this.quizzes[quizIndex], updateData };
    return this.quizzes[quizIndex];
  }

  delete(id: string) {
    this.quizzes = this.quizzes.filter((q) => q.id === id);
    return { message: 'Quiz deleted' };
  }
}
