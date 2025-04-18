import { ApiProperty } from '@nestjs/swagger';

export class PostResultsDto {
  @ApiProperty({
    description: 'The id of the quiz',
    example: '123',
  })
  quizid: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john',
  })
  username: string;

  @ApiProperty({
    description: 'The score of the user',
    example: '10',
  })
  score: number;
}
