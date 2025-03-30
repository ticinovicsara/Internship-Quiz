import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 'Math Quiz', description: 'Title of the quiz' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '123', description: 'Category ID of the quiz' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    type: [CreateQuestionDto],
    description: 'Array of quiz questions',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
