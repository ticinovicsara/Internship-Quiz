import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { PostResultsDto } from './dto/post-results.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({});
  }

  async getLeaderboardForQuiz(quizId: string) {
    const scores = await this.prisma.score.findMany({
      where: { quizId },
      include: {
        user: {
          select: { username: true },
        },
      },
      orderBy: {
        points: 'desc',
      },
    });

    const leaderboard = scores.map((score) => ({
      username: score.user.username,
      points: score.points,
    }));

    return leaderboard;
  }

  async getFullLeaderboard() {
    const scores = await this.prisma.score.findMany({
      include: {
        user: {
          select: { username: true },
        },
        quiz: {
          select: { id: true, title: true },
        },
      },
      orderBy: {
        points: 'desc',
      },
    });

    const userScores: Record<string, Record<string, number>> = {};

    scores.forEach((score) => {
      if (!userScores[score.user.username]) {
        userScores[score.user.username] = {};
      }
      userScores[score.user.username][score.quiz.title] = score.points;
    });

    const leaderboard = Object.entries(userScores).map(
      ([username, quizzes]) => {
        const totalPoints = Object.values(
          quizzes as Record<string, number>,
        ).reduce((sum, points) => sum + points, 0);
        return {
          username,
          quizzes,
          totalPoints,
        };
      },
    );

    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

    return leaderboard;
  }

  async register(data: RegisterUserDto) {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists.');
    }

    const existingUsername = await this.findByUsername(data.username);
    if (existingUsername) {
      throw new BadRequestException('Username already taken.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        role: Role.Player,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return false;

    await this.prisma.user.delete({ where: { id } });
    return true;
  }

  async postUserResults(body: PostResultsDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: body.username },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const existingScore = await this.prisma.score.findFirst({
      where: {
        userId: user.id,
        quizId: body.quizid,
      },
    });

    if (existingScore) {
      if (existingScore.points < body.score) {
        await this.prisma.score.update({
          where: { id: existingScore.id },
          data: { points: body.score },
        });
      }
    } else {
      await this.prisma.score.create({
        data: {
          userId: user.id,
          quizId: body.quizid,
          points: body.score,
        },
      });
    }

    return {
      message: 'Score submitted successfully',
      score: body.score,
    };
  }
}
