export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;

  @IsOptional()
  options?: any;

  @IsOptional()
  corrAnswer?: any;
}
