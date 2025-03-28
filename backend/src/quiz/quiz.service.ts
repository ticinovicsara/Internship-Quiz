import { Injectable } from '@nestjs/common';
import { Quiz } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Quiz[]> {
    return this.prisma.quiz.findMany({
      include: {
        category: true,
        questions: true,
        scores: true,
      },
    });
  }

  async findQuiz(title: string): Promise<Quiz | null> {
    return this.prisma.quiz.findFirst({
      where: { title },
      include: {
        category: true,
        questions: true,
        scores: true,
      },
    });
  }

  async create(data: { title: string; categoryId: string }): Promise<Quiz> {
    return this.prisma.quiz.create({
      data,
    });
  }

  async update(id: string, updateData: Partial<Quiz>): Promise<Quiz | null> {
    return this.prisma.quiz.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.prisma.quiz.delete({ where: { id } });
    return { message: 'Quiz deleted' };
  }
}
