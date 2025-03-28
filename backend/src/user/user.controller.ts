import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.userService.create(body);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return user;
  }
}
