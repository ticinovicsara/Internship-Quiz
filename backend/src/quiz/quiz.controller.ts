import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findQuiz(@Param('id') id: string) {
    return this.quizService.findQuiz(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() quizData) {
    return this.quizService.create(quizData);
  }

  @Put()
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: string, @Body() updateData) {
    return this.quizService.update(id, updateData);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, AdminGuard)
  delete(@Param('id') id: string) {
    return this.quizService.delete(id);
  }
}
