import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuizService } from './quiz.service';

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
  create(@Body() quizData) {
    return this.quizService.create(quizData);
  }

  @Put()
  update(@Param('id') id: string, @Body() updateData) {
    return this.quizService.update(id, updateData);
  }

  @Delete()
  delete(@Param('id') id: string) {
    return this.quizService.delete(id);
  }
}
