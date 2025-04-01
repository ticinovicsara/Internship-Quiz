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
import { ApiBody } from '@nestjs/swagger';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':title')
  findQuiz(@Param('title') title: string) {
    return this.quizService.findQuiz(title);
  }

  @ApiBody({ type: CreateQuizDto })
  @Post()
  //@UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() quizData: CreateQuizDto) {
    return this.quizService.create(quizData);
  }

  @ApiBody({ type: UpdateQuizDto })
  @Put(':id')
  //@UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: string, @Body() updateData: UpdateQuizDto) {
    return this.quizService.update(id, updateData);
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard, AdminGuard)
  delete(@Param('id') id: string) {
    return this.quizService.delete(id);
  }
}
