import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@example.com', description: 'Email korisnika' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Lozinka korisnika' })
  password: string;
}
