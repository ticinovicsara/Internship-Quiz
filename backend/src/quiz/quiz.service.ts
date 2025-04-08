import { Injectable } from '@nestjs/common';
import { Quiz } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

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

  async findQuiz(id: string): Promise<Quiz | null> {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: {
        category: true,
        questions: true,
        scores: true,
      },
    });
  }

  async findCategories() {
    try {
      const categories = await this.prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return categories;
    } catch (error) {
      return {
        success: false,
        message: 'Kategorije nisu dohvacene.',
      };
    }
  }

  async addCategory(id: string) {
    try {
      const category = await this.prisma.category.create({
        data: {
          name: id,
        },
      });
      return category;
    } catch (error) {
      return {
        success: false,
        message: 'Kategorija nije dodana.',
      };
    }
  }

  async create(data: CreateQuizDto): Promise<Quiz> {
    const existingCategory = await this.prisma.category.findFirst({
      where: { name: data.categoryName },
    });

    let categoryId: string;

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await this.prisma.category.create({
        data: {
          name: data.categoryName,
        },
      });
      categoryId = newCategory.id;
    }

    return this.prisma.quiz.create({
      data: {
        title: data.title,
        categoryId: categoryId,
        questions: {
          create: data.questions.map((question) => ({
            text: question.text,
            type: question.type,
            options: JSON.stringify(question.options),
            corrAnswer: JSON.stringify(question.corrAnswer),
          })),
        },
      },
    });
  }

  async update(id: string, updateData: UpdateQuizDto): Promise<Quiz | null> {
    let categoryId: string | null = null;

    if (updateData.categoryName) {
      const existingCategory = await this.prisma.category.findFirst({
        where: { name: updateData.categoryName },
      });

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const newCategory = await this.prisma.category.create({
          data: { name: updateData.categoryName },
        });
        categoryId = newCategory.id;
      }
    }

    return this.prisma.quiz.update({
      where: { id },
      data: {
        title: updateData.title,
        ...(categoryId ? { categoryId } : {}),
        questions: {
          upsert:
            updateData.questions?.map((question) => {
              if (
                !question.text ||
                !question.type ||
                !question.options ||
                !question.corrAnswer
              ) {
                throw new Error('All fields for a question must be provided.');
              }

              return {
                where: { id: question.id || '' },
                create: {
                  text: question.text,
                  type: question.type,
                  options: JSON.stringify(question.options),
                  corrAnswer: JSON.stringify(question.corrAnswer),
                },
                update: {
                  text: question.text,
                  type: question.type,
                  options: JSON.stringify(question.options),
                  corrAnswer: JSON.stringify(question.corrAnswer),
                },
              };
            }) || [],
        },
      },
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.prisma.question.deleteMany({
      where: {
        quizId: id,
      },
    });

    await this.prisma.score.deleteMany({
      where: {
        quizId: id,
      },
    });

    await this.prisma.quiz.delete({
      where: {
        id: id,
      },
    });

    return { message: 'Quiz deleted' };
  }
}
