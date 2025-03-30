import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UserAnwerDto {
  @ApiProperty({
    description: 'User ID',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Question ID',
    example: '321',
  })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({
    description: 'Question answer',
    example: 'Paris',
  })
  @IsOptional()
  answer: any;

  @ApiProperty({
    description: 'Is Answer correct',
    example: 'true',
  })
  @IsBoolean()
  isCorrect: boolean;
}
