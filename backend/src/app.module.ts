import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';
import { QuizService } from './quiz/quiz.service';
import { PrismaModule } from './prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [QuizModule, UserModule, PrismaModule],
  controllers: [AppController, QuizController],
  providers: [AppService, QuizService],
})
export class AppModule {}
