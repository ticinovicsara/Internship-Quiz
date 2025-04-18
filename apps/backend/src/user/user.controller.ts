import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  UserResponseDto,
  RegisterUserDto,
  PostResultsDto,
  UpdateUserDto,
} from './dto';
import { UserService } from './user.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('/leaderboard/:quizId')
  getLeaderboardForQuiz(@Param('quizId') quizId: string) {
    return this.userService.getLeaderboardForQuiz(quizId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('/leaderboardfull')
  getFullLeaderboard() {
    return this.userService.getFullLeaderboard();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.userService.register(body);
  }

  @Post('/score/:id')
  postResults(@Body() body: PostResultsDto) {
    return this.userService.postUserResults(body);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.userService.delete(id);
    if (!deleted) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} deleted successfully` };
  }
}
