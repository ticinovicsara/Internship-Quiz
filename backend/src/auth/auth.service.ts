import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({
      username,
      email,
      password: hashedPassword,
    });
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByEmail(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      access_token: this.jwtService.sign({ userId: user.id, role: user.role }),
    };
  }
}
