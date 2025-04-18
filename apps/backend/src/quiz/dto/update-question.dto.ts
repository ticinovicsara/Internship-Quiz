import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    description: 'id of the question',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  id?: string;

  @ApiProperty({
    description: 'The text of the question',
    example: 'What is the capital of France?',
  })
  @IsString()
  text?: string;

  @ApiProperty({
    description: 'The type of the question (e.g., multiple, true/false)',
    enum: QuestionType,
    example: QuestionType.MULTIPLE,
  })
  @IsEnum(QuestionType)
  type?: QuestionType;

  @ApiProperty({
    description: 'Options for multiple choice questions (optional)',
    type: 'array',
    items: { type: 'string' },
    example: ['Paris', 'London', 'Berlin', 'Madrid'],
    required: false,
  })
  @IsOptional()
  options?: any;

  @ApiProperty({
    description: 'Correct answer for the question (optional)',
    type: 'string',
    example: 'Paris',
    required: false,
  })
  @IsOptional()
  corrAnswer?: any;
}
