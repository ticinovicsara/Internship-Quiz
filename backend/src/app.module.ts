import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';
import { QuizService } from './quiz/quiz.service';
import { PrismaModule } from './prisma.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [QuizModule, UserModule, PrismaModule, AuthModule],
  controllers: [AppController, QuizController, AuthController],
  providers: [AppService, QuizService],
})
export class AppModule {}
