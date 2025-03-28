import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UserAnwerDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsOptional()
  answer: any;

  @IsBoolean()
  isCorrect: boolean;
}
