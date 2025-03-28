import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [QuizModule, AuthModule, UserModule],
  controllers: [AppController, QuizController],
  providers: [AppService, QquizService],
})
export class AppModule {}
